const {test, expect} = require("@playwright/test");

test('End to End Test Flow', async({browser})=>
{
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        const userName = page.getByPlaceholder("email@example.com");
        const password = page.getByPlaceholder("enter your passsword");
        const signInBtn = page.getByRole("button", {name: "Login"});
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
        await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"}).getByRole("button", {name: "Add To Cart"}).click();
        await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
        await page.locator("div li").first().waitFor();
        await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
        await page.getByRole("button", {name: "Checkout"}).click();
        await page.getByPlaceholder("Select Country").pressSequentially("ind", {delay:100});
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        await dropdown.filter({hasText:"India"}).click();
        await expect(page.locator(".user__name [type='text']").first()).toHaveText("nstltesting15@gmail.com");
        await page.locator("//div[contains(.,'CVV Code')]/following-sibling::input").fill("123");
        await page.locator("//div[contains(.,'Name on Card')]/following-sibling::input").fill("Test");
        await page.getByText("PLACE ORDER").click();
        await expect(page.getByText("Thankyou for the order.")).toBeVisible();
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);
        const orderIdTrimmed = orderId.split("|")[1].trim();
        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        await page.locator("tbody tr").filter({hasText: orderIdTrimmed}).getByRole("button", {name: "View"}).click();
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
);