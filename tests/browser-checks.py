import asyncio,json,os,shutil
from pathlib import Path
import yaml
from playwright.async_api import async_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('PORTFOLIO_QA_OUTPUT',str(ROOT/'test-results')))
OUT.mkdir(parents=True,exist_ok=True)
HTML=(ROOT/'dist/index.html').read_text()
checks=[]

def check(name,condition,detail=None):
    checks.append({'check':name,'passed':bool(condition),'detail':detail})
    if not condition: raise AssertionError(f'{name}: {detail}')

OFFLINE="""() => { window.fetch = async () => { throw new TypeError('Offline test fixture'); }; }"""
LIVE="""() => {window.fetch = async url => {
  if (url.includes('/users/')) return new Response(JSON.stringify({login:'aaronedev',public_repos:95,followers:141}),{status:200});
  if (url.includes('/repos/')) return new Response(JSON.stringify({full_name:url.split('/repos/')[1],private:false,visibility:'public',stargazers_count:12}),{status:200});
  return new Response('No WakaTime report available in this fixture',{status:200});
};} """

async def new_page(browser,width=1440,height=1000,fixture=OFFLINE,**kwargs):
    context=await browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1,accept_downloads=True,**kwargs)
    page=await context.new_page()
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    if fixture: await page.evaluate(fixture)
    await page.set_content(HTML,wait_until='load')
    await page.wait_for_timeout(180)
    return context,page,errors

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH') or shutil.which('chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
        context,page,errors=await new_page(browser)
        check('No JavaScript runtime errors on initialization',not errors,errors)
        check('Four public projects visible',await page.locator('.project:visible').count()==4)
        await page.locator('[data-filter="themes"]').click()
        check('Theme filter selects exactly two entries',await page.locator('.project:visible').count()==2)
        check('Filter state announced',await page.locator('#project-count').inner_text()=='2 entries')
        await page.locator('[data-filter="tools"]').click()
        check('Tool filter selects exactly two entries',await page.locator('.project:visible').count()==2)
        await page.locator('[data-filter="all"]').click()
        await page.get_by_role('button',name='Details for Violet Void').click()
        check('Project details and real palette expand',await page.locator('#detail-violet-void').is_visible() and await page.locator('.palette i:visible').count()==6)
        await page.get_by_role('button',name='Details for Violet Void').click()
        check('Project detail collapses',not await page.locator('#detail-violet-void').is_visible())
        await page.get_by_role('button',name='Collapse projects',exact=True).click()
        check('YAML section folds',not await page.locator('#projects-content').is_visible())
        await page.locator('[data-nav="projects"]').click()
        check('Navigation reopens folded section',await page.locator('#projects-content').is_visible())
        await page.locator('#open-source').click()
        check('Raw source dialog opens',await page.locator('#source-dialog').is_visible())
        raw=await page.locator('#yaml-source').inner_text()
        parsed=yaml.safe_load(raw)
        check('Exported YAML parses with a real YAML parser',parsed['developer']['name']=='Aaron' and len(parsed['projects'])==4)
        await page.evaluate("Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copiedYaml=text;}}})")
        await page.locator('#copy-yaml').click()
        check('Copy button transfers actual YAML',await page.evaluate('window.copiedYaml')==raw)
        async with page.expect_download() as download_info:
            await page.locator('#download-yaml').click()
        download=await download_info.value
        check('YAML download has correct filename',download.suggested_filename=='aaron.yml')
        await page.keyboard.press('Escape')
        check('Escape closes dialog and restores focus',not await page.locator('#source-dialog').is_visible() and await page.locator('#open-source').evaluate('(el)=>document.activeElement===el'))
        await page.locator('#motion-toggle').click()
        check('Motion toggle stops rendering',await page.locator('canvas').get_attribute('data-running')=='false' and await page.locator('#motion-toggle').get_attribute('aria-pressed')=='false')
        await page.locator('#motion-toggle').click()
        await page.evaluate("scrollTo({top:0,behavior:'instant'})")
        await page.wait_for_timeout(250)
        check('Motion resumes when enabled and visible',await page.locator('canvas').get_attribute('data-running')=='true')
        bounds=await page.locator('canvas').bounding_box()
        await page.mouse.move(bounds['x']+bounds['width']*.5,bounds['y']+bounds['height']*.5)
        await page.wait_for_timeout(400)
        await page.screenshot(path=str(OUT/'desktop-pointer.png'))
        await page.mouse.move(10,10)
        await page.wait_for_timeout(700)
        await page.locator('#toast').wait_for(state='hidden')
        await page.screenshot(path=str(OUT/'desktop-hero.png'))
        await page.screenshot(path=str(OUT/'desktop-full.png'),full_page=True)
        await page.locator('#activity').scroll_into_view_if_needed()
        await page.wait_for_timeout(250)
        await page.screenshot(path=str(OUT/'desktop-activity.png'))
        check('Offscreen particles stop',await page.locator('canvas').get_attribute('data-running')=='false')
        check('Offline stats retain verified snapshot',await page.locator('#stat-repos').inner_text()=='94' and 'live refresh unavailable' in await page.locator('#github-status').inner_text())
        check('External links are safe new-tab links',await page.locator('a[target="_blank"]:not([rel*="noopener"])').count()==0)
        check('No runtime errors after primary interactions',not errors,errors)
        await context.close()

        for width in [320,360,390,768,1024,1440,1920]:
            ctx,pg,errs=await new_page(browser,width,900)
            dims=await pg.evaluate('({view:innerWidth,scroll:document.documentElement.scrollWidth})')
            if dims['scroll']>dims['view']:
                offending=await pg.locator('body *').evaluate_all('(els)=>els.filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+.5}).map(e=>({tag:e.tagName,cls:e.className,right:e.getBoundingClientRect().right})).slice(0,15)')
            else: offending=None
            check(f'No horizontal overflow at {width}px',dims['scroll']<=dims['view'],offending)
            check(f'No runtime errors at {width}px',not errs,errs)
            await ctx.close()

        ctx,mobile,errs=await new_page(browser,390,844,is_mobile=True,has_touch=True)
        check('Touch devices receive bounded particle count',int(await mobile.locator('canvas').get_attribute('data-particles'))<=750)
        await mobile.screenshot(path=str(OUT/'mobile-hero.png'))
        await mobile.screenshot(path=str(OUT/'mobile-full.png'),full_page=True)
        await mobile.locator('[data-filter="tools"]').click()
        check('Mobile project filtering works',await mobile.locator('.project:visible').count()==2)
        await mobile.locator('#open-source').click()
        check('Mobile raw dialog fits screen',await mobile.locator('#source-dialog').evaluate('(e)=>{const r=e.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.height<=innerHeight;}'))
        await mobile.keyboard.press('Escape')
        check('No runtime errors on touch device',not errs,errs)
        await ctx.close()

        ctx,reduced,errs=await new_page(browser,reduced_motion='reduce')
        check('OS reduced-motion preference stops particle rendering',await reduced.locator('canvas').get_attribute('data-running')=='false')
        check('Reduced-motion disables smooth scroll',await reduced.evaluate("getComputedStyle(document.documentElement).scrollBehavior")=='auto')
        await reduced.locator('#motion-toggle').click()
        check('UI never overrides OS reduced-motion preference',await reduced.locator('canvas').get_attribute('data-running')=='false')
        await ctx.close()

        ctx,live,errs=await new_page(browser,fixture=LIVE)
        check('Successful API responses update actual counters',await live.locator('#stat-repos').inner_text()=='95' and await live.locator('#stat-followers').inner_text()=='141')
        check('Live status only follows validated success',await live.locator('#github-status').get_attribute('data-status')=='live')
        check('Missing weekly report preserves old timestamp', '06 Sept 2026' in await live.locator('#coding-date').inner_text() or '06 Sep 2026' in await live.locator('#coding-date').inner_text())
        check('No runtime errors on successful refresh',not errs,errs)
        await ctx.close()

        ctx,static,errs=await new_page(browser,fixture=None,java_script_enabled=False)
        check('Projects exist without JavaScript',await static.locator('.project').count()==4)
        check('Static stats are visible without JavaScript',await static.locator('#stat-followers').inner_text()=='140')
        await ctx.close()
        await browser.close()
    (OUT/'browser-results.json').write_text(json.dumps(checks,indent=2))
    print(json.dumps({'passed':len(checks),'failed':0,'checks':checks},indent=2))

try: asyncio.run(main())
except Exception:
    (OUT/'browser-results.json').write_text(json.dumps(checks,indent=2))
    raise
