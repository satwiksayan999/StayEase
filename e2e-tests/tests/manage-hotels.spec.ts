import {test , expect } from "@playwright/test";
import path from "path";

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

test("should allow the user to sign in" , async({page})=>{

    //go to the link
    await page.goto(`${UI_URL}add-hotel`);

    //
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Test Description");
    await page.locator('[name="pricepernight"]').fill("100");

    await page.selectOption('select[name="starrating"]' , '3');

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultcount"]').fill("2");
    await page.locator('[name="childcount"]').fill("4");

    await page.setInputFiles( '[name="imagefiles"]' , [
         path.join(__dirname , "files" , "1.jpg") ,
         path.join(__dirname , "files" , "2.jpg")
    ]);
    
    await page.getByRole("button" , {name: "Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();


});

test("should display hotel", async({page})=>{
    await page.goto(`${UI_URL}my-hotels`);

    await expect(page.getByText("hello")).toBeVisible();
    await expect(page.getByText("good hotel in")).toBeVisible();
    await expect(page.getByText("dhanbad , india")).toBeVisible();
    await expect(page.getByText("Budget")).toBeVisible();
    await expect(page.getByText("100 per night")).toBeVisible();
    await expect(page.getByText("2 adults , 4 childs")).toBeVisible();
    await expect(page.getByText("5 star rating")).toBeVisible();

   await expect(page.getByRole("link" , {name: "Add Hotel"} )).toBeVisible();
   await expect(page.getByRole("link" , {name: "View Details"} )).toBeVisible();

})