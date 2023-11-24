const playwright = require('playwright-core');

playwright.chromium.launch({ channel: 'chrome', headless: false }).then(async browser => {
    let count = 1;
    const url = "https://example.com"

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(url);
    await page.keyboard.press('Control+F5');
    setInterval(async () => {
        await page.screenshot({ path: `./screenshots/${String(count).padStart(3, "0")}.png` });
        await page.keyboard.press('ArrowRight');
        count++;
    }, 1000);
});
