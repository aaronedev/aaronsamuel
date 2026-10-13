/** Public, curated content only. Never add credentials or private repository metadata here. */
export const PROFILE = Object.freeze({
  name: 'Aaron',
  handle: 'aaronedev',
  role: 'Software developer',
  location: 'Cologne, Germany',
  github: 'https://github.com/aaronedev',
  matrix: 'https://matrix.to/#/@aaronedev:matrix.org',
  wakatime: 'https://wakatime.com/@018cc02c-e893-42e6-b1c7-48cb3ef3ccfe',
  description: 'Linux-first tools, thoughtful interfaces, and a little Violet Void.',
});

export const PUBLIC_OWNERS = Object.freeze(['aaronedev', 'Violet-Void', 'bauerstischfinder']);
export const SNAPSHOT_DATE = '2026-09-06';
export const README_URL = 'https://raw.githubusercontent.com/aaronedev/aaronedev/main/README.md';
export const PROFILE_SOURCE = 'https://github.com/aaronedev/aaronedev/blob/main/README.md';

export const PROJECTS = Object.freeze([
  {
    id: 'violet-void', name: 'Violet Void', category: 'themes',
    repo: 'aaronedev/violet-void-theme', stars: 11,
    description: 'One palette. Every surface. A dark, violet-first color system for editors, terminals, and the web.',
    detail: 'The common thread through my workspace: considered contrast, quiet backgrounds, and just enough color to make the important things feel important.',
    tags: ['color_system', 'cross_platform'],
    note: 'a little less noise, a little more violet', palette: true,
  },
  {
    id: 'nerdfont-picker', name: 'Nerd Font Picker', category: 'tools',
    repo: 'aaronedev/nerdfont-icon-rofi-picker', stars: 3,
    description: 'The right icon, without breaking your flow. Fuzzy Rofi search, straight to your clipboard.',
    detail: 'A small, focused Linux utility: browse Nerd Font icons, find a match, and copy it for the next status bar, script, or interface.',
    tags: ['Shell', 'Rofi'],
    note: 'small tools should get out of your way', palette: false,
  },
  {
    id: 'archwiki-theme', name: 'ArchWiki, reimagined', category: 'themes',
    repo: 'aaronedev/violet-void-theme_archwiki', stars: 3,
    description: 'A calmer place to learn Linux. The depth of the ArchWiki, in the colors of Violet Void.',
    detail: 'A dedicated stylesheet bringing a consistent dark palette to a high-information website, with the documentation itself still taking center stage.',
    tags: ['Stylus', 'CSS'],
    note: 'made for the pages I keep coming back to', palette: false,
  },
  {
    id: 'profile-automation', name: 'Profile, automated', category: 'tools',
    repo: 'aaronedev/aaronedev', stars: 28,
    description: 'A profile that keeps up. GitHub activity, coding statistics, and generated visuals, brought together.',
    detail: 'Public activity and WakaTime statistics feed my GitHub profile. A little automation keeps the page connected to the work behind it.',
    tags: ['Python', 'GitHub_Actions'],
    note: 'let the work speak for itself', palette: false,
  },
]);

/** Dated observations, not invented real-time counters. */
export const INITIAL_STATS = Object.freeze({
  profile: { publicRepos: 94, followers: 140, fetchedAt: SNAPSHOT_DATE, source: 'snapshot' },
  repositories: Object.fromEntries(PROJECTS.map(p => [p.repo, { stars: p.stars, fetchedAt: SNAPSHOT_DATE, source: 'snapshot', available: true }])),
  coding: {
    displayTime: '77h 15m', period: 'latest published week', fetchedAt: SNAPSHOT_DATE, source: 'snapshot',
    languages: [
      {name: 'Python', percent: 54.4, time: '42h 1m', color: 'var(--violet)'},
      {name: 'Markdown', percent: 17.23, time: '13h 18m', color: 'var(--cyan)'},
      {name: 'Bash', percent: 6.13, time: '4h 44m', color: 'var(--green)'},
      {name: 'JSON', percent: 4.28, time: '3h 18m', color: 'var(--pink)'},
      {name: 'Remaining', percent: 17.96, time: '', color: 'var(--muted)'},
    ],
  },
});

export function freshStats() { return structuredClone(INITIAL_STATS); }

/** JSON string syntax is valid YAML double-quoted scalar syntax. */
export function yamlQuote(value) { return JSON.stringify(String(value)); }
export function asYaml(stats = freshStats()) {
  const q = yamlQuote;
  const lines = [
    '---', '# Aaron — a little about the person behind the code.',
    '# Source: public GitHub profile and its published WakaTime statistics.',
    '# GitHub counts cover the personal account, not organization totals.',
    'developer: &aaron', `  name: ${q(PROFILE.name)}`, `  handle: ${q('@' + PROFILE.handle)}`,
    `  role: ${q(PROFILE.role)}`, `  based_in: ${q(PROFILE.location)}`,
    '  about: |', '    I make tools feel like second nature.', `    ${PROFILE.description}`,
    '  focus: [linux, developer_tools, thoughtful_ui]', '',
    'projects:',
  ];
  for (const project of PROJECTS) {
    const repo = stats.repositories[project.repo];
    lines.push(`  - name: ${q(project.name)}`, `    kind: ${q(project.category)}`,
      `    description: ${q(project.description)}`, `    stack: [${project.tags.map(q).join(', ')}]`,
      `    source: ${q('https://github.com/' + project.repo)}`,
      `    stars: ${repo?.available === false ? 'null' : repo?.stars ?? project.stars}`,
      `    observed_at: ${q(repo?.fetchedAt ?? SNAPSHOT_DATE)}`,
      `    available: ${repo?.available !== false}`,
    );
  }
  lines.push('', 'statistics:', '  github:', `    public_repositories: ${stats.profile.publicRepos}`,
    `    followers: ${stats.profile.followers}`, `    observed_at: ${q(stats.profile.fetchedAt)}`,
    `    source: ${q(stats.profile.source)}`, '  wakatime:', `    coding_time: ${q(stats.coding.displayTime)}`,
    `    period: ${q(stats.coding.period)}`, `    observed_at: ${q(stats.coding.fetchedAt)}`,
    `    source: ${q(PROFILE_SOURCE)}`, '    languages:');
  for (const lang of stats.coding.languages) lines.push(`      ${q(lang.name)}: ${lang.percent}`);
  lines.push('', 'contact:', `  github: ${q(PROFILE.github)}`, `  matrix: ${q(PROFILE.matrix)}`,
    `  wakatime: ${q(PROFILE.wakatime)}`, '', '...');
  return lines.join('\n') + '\n';
}
