import {test, expect } from "@playwright/test"

const UI_URL = "http://localhost:5173/"

test.beforeEach( async({page})=>{

    await page.goto(UI_URL);

    //get the sign in button
    await page.getByRole("link" ,{name:"Sign In"}).click();
 
    //appear the sign in 
    await expect(page.getByRole("heading" , { name:"Sign In"})).toBeVisible();
 
    //fill in the email and password
    await page.locator("[name=email]").fill("4444@gmail.com");
    await page.locator("[name=password]").fill("1234567");
 
    //click on log in button
    await page.getByRole("button",{ name:"Sign In"}).click();
 
    //see the things happen after clicked on log in button
    await expect(page.getByText("Sign In Successfull!")).toBeVisible();


});

test("should show hotel search result" , async({page}) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("where are you going").fill("dhanbad");
    await page.getByRole("button" , {name: "Search"}).click();

    await expect(page.getByText("Hotels found in dhanbad")).toBeVisible();
    await expect(page.getByText("satwik")).toBeVisible();

});

test("should show hotel detail" , async({page}) => {

    await page.goto(UI_URL);

    await page.getByPlaceholder("where are you going").fill("dhanbad");
    await page.getByRole("button" , {name: "Search"}).click();

    await page.getByText("satwik").click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole("button" , {name:"Book Now"})).toBeVisible();

});

test("should book hotel" , async({page}) => {

    await page.goto(UI_URL);

    await page.getByPlaceholder("where are you going").fill("dhanbad");

    const date= new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("check-out Date").fill(formattedDate);


    await page.getByRole("button" , {name: "Search"}).click();

    await page.getByText("name").click();
    await page.getByRole("button" , {name:"Book Now"}).click();

    await expect(page.getByText("Total Cost: Rs.300.00")).toBeVisible();

    const stripeFrame = page.frameLocator("iframe").first();

    await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");
    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24225");

    await page.getByRole("button" , {name:"Confirm Booking"}).click();
    await expect(page.getByText("Booking Saved!")).toBeVisible();

    await page.getByRole("link" , {name: "My-Bookings"}).click();
    await expect(page.getByText("name")).toBeVisible();

  
});