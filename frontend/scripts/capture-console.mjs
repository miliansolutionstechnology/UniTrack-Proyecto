import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', (msg) => {
    console.log('[BROWSER LOG]', msg.type(), msg.text());
  });

  page.on('pageerror', (err) => {
    console.error('[PAGE ERROR]', err.message);
  });

  try {
    const url = 'http://127.0.0.1:4300/';
    console.log('Opening', url);
    const resp = await page.goto(url, { waitUntil: 'networkidle' });
    console.log('HTTP status:', resp && resp.status());
    await page.screenshot({ path: 'capture.png', fullPage: true });
    console.log('Saved screenshot capture.png');
  } catch (e) {
    console.error('Error during page load:', e);
  } finally {
    await browser.close();
  }
})();
