const {test, expect} = require("@playwright/test");

test('End to End Test Flow', async({browser})=>
{
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        const userName = page.locator("#userEmail");
        const password = page.locator("#userPassword");
        const signInBtn = page.locator("#login");
        const cardTitles = page.locator(".card-body b");
        const products = page.locator(".card-body");
        await page.goto("https://rahulshettyacademy.com/client/");
        console.log(await page.title());
        await expect(page).toHaveTitle("Let's Shop");
        await userName.fill("nstltesting15@gmail.com");
        await password.fill("Test@123");
        await signInBtn.click();
        const firstProductIs = await cardTitles.first().textContent();
        console.log(firstProductIs);
        await expect(cardTitles.first()).toHaveText("ADIDAS ORIGINAL");
        const allProducts = await cardTitles.allTextContents();
        console.log(allProducts);
        const count = await products.count();
        for(let i=0; i<count; ++i)
        {
            const productName = await products.nth(i).locator("b").textContent();
            if(productName.includes("ADIDAS ORIGINAL"))
            {
                await products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
        await page.locator("[routerlink*='cart']").click();
        await page.locator("div li").first().waitFor();
        const bool =await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
        expect(bool).toBeTruthy();
        await page.locator("text=Checkout").click();
        await page.locator("[placeholder*='Country']").pressSequentially("ind", {delay:100});
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for(let i=0; i<optionsCount; ++i)
        {
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text.includes("India"))
            {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await expect(page.locator(".user__name [type='text']").first()).toHaveText("nstltesting15@gmail.com");
        await page.locator("//div[contains(.,'CVV Code')]/following-sibling::input").fill("123");
        await page.locator("//div[contains(.,'Name on Card')]/following-sibling::input").fill("Test");
        await page.locator(".action__submit").click();
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const rows = page.locator("tbody tr");
        for(let i=0; i<await rows.count(); ++i)
        {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId))
            {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
);