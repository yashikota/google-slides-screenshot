const playwright = require('playwright-core');
const fs = require('fs');
const path = require('path');

playwright.chromium.launch({ channel: 'chrome', headless: false }).then(async browser => {
    let count = 1;
    const url = "https://example.com"

    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(url);
    await page.keyboard.press('Control+F5');
    setInterval(async () => {
        await page.screenshot({ path: `./screenshots/${String(count).padStart(3, "0")}.png` });
        if (count > 1) {
            const current = fs.readFileSync(path.resolve(__dirname, `./screenshots/${String(count).padStart(3, "0")}.png`));
            const previous = fs.readFileSync(path.resolve(__dirname, `./screenshots/${String(count - 1).padStart(3, "0")}.png`));
            if (current.equals(previous)) {
                fs.unlinkSync(path.resolve(__dirname, `./screenshots/${String(count).padStart(3, "0")}.png`));
                process.exit(0);
            }
        }
        await page.keyboard.press('ArrowRight');
        count++;
    }, 1000);
});
