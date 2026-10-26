const {test, expect} = require('@playwright/test');
test('FramesPopUpMouseOver', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#confirmbtn").click();
    await page.on('dialog', dialog => dialog.accept());
    await page.hover("#mousehover");
    const frames = page.frameLocator("#courses-iframe");
    await frames.locator("li a[href*='lifetime-access']:visible").click();

})