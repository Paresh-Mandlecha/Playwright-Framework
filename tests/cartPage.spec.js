import {test,expect,page} from '@playwright/test';
import { ProductPage} from '../pages/ProductPage';
import { BASE_URL,USERNAME,PASSWORD } from '../utils/envConfig';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';  
import { ProductPageLocators } from '../locators/ProductPageLocators';
import {productsToCart} from '../testdata/products';
import { CartPage } from '../pages/cartPage';

test.describe("Cart Page Validation",()=>{

    let loginPage;
    let productPage;
    let cartPage;   

    test.beforeEach(async ({page})=>{

        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWORD);   
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");  
    })

    //we will validate page URL and UI elements of cart page in this test case
    test("Validate Cart Page URL and UI Elements", async ({page}) => {

         //here we will add first product to the cart
        await productPage.addFirstProductToCart();
       
        //here we will click on cart link to navigate to cart page
        await productPage.clickOnCartLink();

        //here we will validate URL of cart page
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

        const ui = await cartPage.getCartPageElements();

        //here we will validate cart title
        await expect(ui.carTitle).toBeVisible();
       
        //here we will validate shopping cart link
       // await expect (ui.continueShoppingButton).toBeVisible();
       
       //here we will validate checkout button
        await expect (ui.checkOut).toBeVisible();
    
    })

    //here we will validate continue shooping functionality of cart page
    test("Validate Continue Shopping Functionality", async ({page}) => {

        //here we will add first product to the cart
        await productPage.addFirstProductToCart();
       
        //here we will click on cart link to navigate to cart page
        await productPage.clickOnCartLink();

        await cartPage.clickOncontinueShopping();
        
        //here we will validate URL of product page
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

    //here we will validate single product in the cart page
//      test("Validate first product in the cart page", async ({page}) => {
        
//         const firstProduct=await productPage.getFirstProductDetails();
//         await productPage.addFirstProductToCart();
//         await productPage.clickOnCartLink();

//         // cartProducts will have details of first product in the cart page
//         const cartProducts=await cartPage.getCartProductDetails();

//         //validate name of first product in the cart page
//         expect(cartProducts[0]).toEqual(firstProduct);

        
// })

    //here we will validate All products in the cart page
    test.only("Validate All products in the cart page", async ({page}) => {
        
        const allProductDetails=await productPage.getAllProductDetails();
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();

        // cartProducts will have details of first product in the cart page
         const cartProducts=await cartPage.getCartProductDetails();

         //validate name of first product in the cart page
         expect(cartProducts[0]).toEqual(allProductDetails);
    
    })

    //here we will validate specific product added to cart page
    test("Validate specific product added to cart page", async ({page}) => {
        
    
    })

    //here we will validate remove product functionality of cart page
    test("Validate Remove product functionality in the cart page", async ({page}) => {
        
    
    })
})