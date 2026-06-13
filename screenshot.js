#!/usr/bin/env node
// Usage: node screenshot.js <html-file-path> <output-png-path>
const puppeteer = require('puppeteer');
const path = require('path');

const [,, htmlFile, outFile] = process.argv;
if (!htmlFile || !outFile) {
  console.error('Usage: node screenshot.js <html-file> <output.png>');
  process.exit(1);
}

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 800, deviceScaleFactor: 1.5 });
  await page.goto('file://' + path.resolve(htmlFile), { waitUntil: 'networkidle0' });
  // Full-page screenshot
  await page.screenshot({ path: outFile, fullPage: true });
  await browser.close();
  console.log('Screenshot saved:', outFile);
})();
