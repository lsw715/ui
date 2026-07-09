import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const URL = 'https://ops-card-dev.eu.paykka.com/gateway-order-refund-list';
const OUT_DIR = path.resolve('docs/design-references/ops-card-dev.eu.paykka.com');
const RESEARCH_DIR = path.resolve('docs/research/ops-card-dev.eu.paykka.com');

await mkdir(OUT_DIR, { recursive: true });
await mkdir(RESEARCH_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: 'zh-CN',
});
const page = await context.newPage();

try {
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);

  const title = await page.title();
  const currentUrl = page.url();
  const bodyText = await page.locator('body').innerText();

  await page.screenshot({
    path: path.join(OUT_DIR, 'desktop-1440-full.png'),
    fullPage: true,
  });

  const extraction = await page.evaluate(() => {
    const props = [
      'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'letterSpacing', 'color',
      'backgroundColor', 'padding', 'margin', 'width', 'height', 'display', 'flexDirection',
      'justifyContent', 'alignItems', 'gap', 'borderRadius', 'border', 'boxShadow',
      'position', 'zIndex', 'opacity', 'transition',
    ];

    function extractStyles(element) {
      const cs = getComputedStyle(element);
      const styles = {};
      props.forEach((p) => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') {
          styles[p] = v;
        }
      });
      return styles;
    }

    const images = [...document.querySelectorAll('img')].map((img) => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
    }));

    const fonts = [...new Set([...document.querySelectorAll('*')].slice(0, 300).map((el) => getComputedStyle(el).fontFamily))];

    const app = document.querySelector('#app');
    const appHtml = app ? app.innerHTML.slice(0, 5000) : null;

    return {
      title: document.title,
      url: location.href,
      fonts,
      images,
      svgCount: document.querySelectorAll('svg').length,
      bodyText: document.body.innerText.slice(0, 3000),
      appClasses: app?.className,
      appStyles: app ? extractStyles(app) : null,
      favicons: [...document.querySelectorAll('link[rel*="icon"]')].map((l) => l.href),
      cssLinks: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href),
    };
  });

  await writeFile(
    path.join(RESEARCH_DIR, 'initial-extraction.json'),
    JSON.stringify({ title, currentUrl, bodyText: bodyText.slice(0, 3000), extraction }, null, 2),
  );

  console.log(JSON.stringify({ title, currentUrl, bodyPreview: bodyText.slice(0, 500) }, null, 2));
} catch (error) {
  console.error('INSPECTION_ERROR:', error.message);
  await page.screenshot({ path: path.join(OUT_DIR, 'error-state.png'), fullPage: true });
  process.exitCode = 1;
} finally {
  await browser.close();
}
