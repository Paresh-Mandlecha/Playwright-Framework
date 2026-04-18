import {test,expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';

test("login to sauce demo",async({page})=>{

    //here we create object of login page.
    const loginPage=new LoginPage(page);
  
    await page.goto(BASE_URL);
    //here we call login method using loginpage varible because 
    // we have created login method in login page and we have to pass username and password 
    // as argument from envConfig.js file.    
    await loginPage.login(USERNAME,PASSWORD);   
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");   
    
    // await page.goto("https://www.saucedemo.com/");
    // await page.locator("#user-name").fill("standard_user");
    // await page.locator("#password").fill("secret_sauce");               
    // await page.locator("#login-button").click();    
   // await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

     

})