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

})