import { test, expect } from '@playwright/test';

const UI_URL = "http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
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
   await expect(page.getByRole("link",{ name:"My-Bookings"})).toBeVisible();
   await expect(page.getByRole("link",{ name:"My-Hotels"})).toBeVisible();
   await expect(page.getByRole("button",{ name:"Sign Out"})).toBeVisible();
  
});

/*
test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

test('should allow user to register' , async({ page })=>{

  //producing random email
  const testEmail = `test_register_${Math.floor(Math.random() * 90000)+10000}@test.com`

  await page.goto(UI_URL);

  //click on sign - in 
  await page.getByRole("link" , {name: "Sign In"}).click();

  //click on create an account here
  await page.getByRole("link" , {name:"Create an account here"}).click();

  //move to create an account page
  await expect(page.getByRole("heading" ,{name:"Create an Account"})).toBeVisible();

  //now fill the details
  await page.locator("[name=firstname]").fill("test_firstname");
  await page.locator("[name=lastname]").fill("test_lastname");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmpassword]").fill("password123");

  //click on create account button
  await page.getByRole("button",{name:"Create Account"}).click();

  //things that shuld appear next
   await expect(page.getByText("Registration Successfull")).toBeVisible();
   await expect(page.getByRole("link",{ name:"My-Bookings"})).toBeVisible();
   await expect(page.getByRole("link",{ name:"My-Hotels"})).toBeVisible();
   await expect(page.getByRole("button",{ name:"Sign Out"})).toBeVisible();

});
