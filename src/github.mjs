import { PUBLIC_OWNERS, PROJECTS, PROFILE, README_URL, freshStats } from './content.mjs';

const CACHE_KEY = 'aaron.yml:public-stats:v1';
const TTL = 15 * 60 * 1000;
const isCount = n => Number.isSafeInteger(n) && n >= 0;

export function isAllowedRepository(fullName) {
  if (typeof fullName !== 'string' || !/^[\w.-]+\/[\w.-]+$/.test(fullName)) return false;
  const owner = fullName.split('/')[0].toLowerCase();
  return PUBLIC_OWNERS.some(allowed => allowed.toLowerCase() === owner) && PROJECTS.some(p => p.repo.toLowerCase() === fullName.toLowerCase());
}

export function validatePublicProfile(data) {
  if (!data || data.login?.toLowerCase() !== PROFILE.handle || !isCount(data.public_repos) || !isCount(data.followers)) throw new Error('Unexpected public profile response.');
  // Explicit field selection: never copy arbitrary API data into the public site.
  return {publicRepos: data.public_repos, followers: data.followers};
}

export function validatePublicRepository(data, expectedName) {
  if (!isAllowedRepository(expectedName) || !data || data.private !== false || data.visibility !== 'public' || data.full_name?.toLowerCase() !== expectedName.toLowerCase() || !isCount(data.stargazers_count)) throw new Error('Unexpected or non-public repository response.');
  return {stars: data.stargazers_count, available: true};
}

function compactTime(text) {
  const hours = text.match(/(\d+)\s*hrs?\b/i);
  const minutes = text.match(/(\d+)\s*mins?\b/i);
  if (!hours && !minutes) return null;
  return [hours ? `${hours[1]}h` : '', minutes ? `${minutes[1]}m` : ''].filter(Boolean).join(' ');
}

/** Parse only published language/time aggregates. Ignore all repo names and activity details. */
export function parsePublishedWakatime(markdown) {
  if (typeof markdown !== 'string' || markdown.length > 1_000_000) throw new Error('Invalid profile document.');
  const region = markdown.split(/Programming Languages:/i)[1]?.split(/(?:🔥\s*)?Editors:/i)[0];
  if (!region) return null;
  const colors = {'Python':'var(--violet)', 'Markdown':'var(--cyan)', 'Bash':'var(--green)', 'JSON':'var(--pink)'};
  const all = [];
  for (const line of region.split('\n')) {
    const match = line.match(/^\s*([A-Za-z][\w+#. -]{0,40}?)\s{2,}(.+?)\s+([\d.]+)%\s*$/);
    if (!match) continue;
    const percent = Number(match[3]);
    if (!Number.isFinite(percent) || percent < 0 || percent > 100) continue;
    const name = match[1].trim();
    if (all.some(item => item.name === name)) return null;
    all.push({name, percent, time: compactTime(match[2]) ?? '', color: colors[name] ?? 'var(--muted)'});
  }
  if (!all.length || all.reduce((sum, item) => sum + item.percent, 0) > 100.1) return null;
  const selected = all.filter(item => item.name !== 'Other').sort((a,b) => b.percent-a.percent).slice(0,4);
  const sum = selected.reduce((total,item) => total + item.percent, 0);
  if (sum < 99.95) selected.push({name:'Remaining', percent:Math.round((100-sum)*100)/100, time:'', color:'var(--muted)'});
  const os = markdown.split(/Operating System:/i)[1]?.split('```')[0] ?? '';
  const osLines = [...os.matchAll(/^[ \t]*[A-Za-z][\w -]+?[ \t]{2,}(.+?)[ \t]+([\d.]+)%[ \t]*$/gm)];
  // A single 100% OS row is the published total; otherwise no invented total.
  const totalRow = osLines.find(match => Number(match[2]) === 100);
  return {languages:selected, displayTime:totalRow ? compactTime(totalRow[1]) : null, period:'latest published week'};
}

async function fetchPublic(url, parse = 'json') {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const response = await fetch(url, {signal:controller.signal, credentials:'omit', referrerPolicy:'no-referrer', headers: url.startsWith('https://api.github.com/') ? {Accept:'application/vnd.github+json'} : {}});
    if (!response.ok) {
      const error = new Error(`Public source returned HTTP ${response.status}.`);
      error.status = response.status;
      throw error;
    }
    return parse === 'text' ? await response.text() : await response.json();
  } finally { clearTimeout(timeout); }
}

export function readCachedStats(storage, now = Date.now()) {
  try {
    const cache = JSON.parse(storage?.getItem(CACHE_KEY) ?? 'null');
    if (!cache || !Number.isFinite(cache.savedAt) || cache.savedAt > now || now - cache.savedAt >= TTL) return null;
    const profile = cache.profile;
    if (!profile || !isCount(profile.publicRepos) || !isCount(profile.followers) || !Number.isFinite(Date.parse(profile.fetchedAt))) return null;
    const result = freshStats();
    result.profile = {publicRepos:profile.publicRepos, followers:profile.followers, fetchedAt:profile.fetchedAt, source:'cached'};
    for (const project of PROJECTS) {
      const entry = cache.repositories?.[project.repo];
      if (entry && isCount(entry.stars) && Number.isFinite(Date.parse(entry.fetchedAt)) && typeof entry.available === 'boolean') {
        result.repositories[project.repo] = {stars:entry.stars, fetchedAt:entry.fetchedAt, available:entry.available, source:'cached'};
      }
    }
    // No free-text remote values restored from storage. WakaTime remains the dated published snapshot.
    return result;
  } catch { return null; }
}

export async function refreshStats(previous = freshStats()) {
  const next = structuredClone(previous);
  const timestamp = new Date().toISOString();
  const jobs = [
    fetchPublic(`https://api.github.com/users/${PROFILE.handle}`).then(validatePublicProfile),
    ...PROJECTS.map(project => fetchPublic(`https://api.github.com/repos/${project.repo}`).then(data => validatePublicRepository(data, project.repo))),
    fetchPublic(README_URL, 'text').then(parsePublishedWakatime),
  ];
  const results = await Promise.allSettled(jobs);
  const profileResult = results[0];
  let githubUpdates = 0;
  if (profileResult.status === 'fulfilled') {
    next.profile = {...profileResult.value, fetchedAt:timestamp, source:'live'};
    githubUpdates++;
  }
  PROJECTS.forEach((project, index) => {
    const result = results[index+1];
    if (result.status === 'fulfilled') {
      next.repositories[project.repo] = {...result.value, fetchedAt:timestamp, source:'live'};
      githubUpdates++;
    } else if (result.reason?.status === 404) {
      // A disappeared/public-to-private repository is not represented as a current public success.
      next.repositories[project.repo] = {stars:0, available:false, fetchedAt:timestamp, source:'live'};
    }
  });
  const codingResult = results.at(-1);
  if (codingResult.status === 'fulfilled' && codingResult.value) {
    next.coding = {...codingResult.value, displayTime:codingResult.value.displayTime ?? 'Not published', fetchedAt:timestamp, source:'published'};
  }
  const full = githubUpdates === PROJECTS.length + 1;
  return {stats:next, status:full ? 'live' : githubUpdates ? 'partial' : 'offline', profileUpdated:profileResult.status === 'fulfilled'};
}

export function cacheStats(storage, stats) {
  try {
    if (stats.profile.source !== 'live') return;
    storage?.setItem(CACHE_KEY, JSON.stringify({savedAt:Date.now(), profile:stats.profile, repositories:stats.repositories}));
  } catch { /* Storage is optional. Private browsing must not break the page. */ }
}
