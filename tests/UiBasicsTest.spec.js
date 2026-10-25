const {test, expect} = require('@playwright/test');

test('My First Program', async({browser})=>
{
    
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const blinkLink = page.locator("[href*='documents-request']");
    const cardTitles = page.locator(".card-body a");
    const dropDown = page.locator("select.form-control");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.fill("rahulshettyacademy");
    await password.fill("lng");
    await signInBtn.click();
    const errorMsg = await page.locator("[style*='block']").textContent();
    console.log(errorMsg);
    await expect(page.locator("[style*='block']")).toContainText("password");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.waitForLoadState('networkidle');
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await expect(blinkLink).toHaveAttribute("class", "blinkingText");

    await signInBtn.click();
    const firstProductIs = await cardTitles.first().textContent();
    console.log(firstProductIs);
    await expect(cardTitles.first()).toHaveText("iphone X");
    const allProducts = await cardTitles.allTextContents();
    console.log(allProducts);
})  

test.only('Navigate to another page', async({browser})=>
{
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const blinkLink = page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    const [newPage] = await Promise.all([
        browserContext.waitForEvent('page'),
        blinkLink.click()])
    await expect(newPage).toHaveTitle("RS Academy");
    const text = await newPage.locator(".red").textContent();
    const splitText = text.split("@");
    const domain = splitText[1].split(" ")[0];
    const userId = domain.split(".")[0];
    console.log(text);
    console.log(domain);
    console.log(userId);
    newPage.close();
    await userName.fill(userId);
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
    console.log(page.title());
})