import {test,expect,page} from '@playwright/test';
import { ProductPage} from '../pages/ProductPage';
import { BASE_URL,USERNAME,PASSWORD } from '../utils/envConfig';
import { LoginPage } from '../pages/LoginPage';
import { LoginLocators } from '../locators/LoginLocators';  
import { ProductPageLocators } from '../locators/ProductPageLocators';
import {productsToCart} from '../testdata/products';

test.describe("Product Page Validation",()=>{
    //here we are declaring variables of login page and product page because we have to use login functionality before each test and also we have to use product page functionality in each test    
    let loginPage;
    let productPage;

    test.beforeEach(async ({page})=>{

        //here we are creating object of login page and product page because we have to use login functionality before each test and also we have to use product page functionality in each test
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME,PASSWORD);   
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");  
    })


    //here we have to validate logout page
    test("validate logout functionality",async({page})=>{
        
        await productPage.logout();
        
        //here we are doing assertion bcause after succefully logout we have to see login page 
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible();


    })

    test("validate Aboutpage and navigate back",async({page})=>{

    //just clicking is not enough in about page we have to validate Request Demo and try it free at top of webpage
        await productPage.openAboutPage();
        
        //just clicking is not enough in about page we have to validate Request Demo and try it free at top of webpage
        await expect(page.getByRole('button', { name: 'Request a demo' })).toBeVisible();
        //  await expect(page.locator(ProductPageLocators.requestDemoButton)).toBeVisible({timeout:5000});
        
        await expect(page.getByRole('button', { name: 'Try it free' })).toBeVisible();
        //await expect(page.locator(ProductPageLocators.tryItFree)).toBeVisible();

        await page.goBack();

        //here after going back we have to see setting icon button on webpage
        await expect(page.locator(ProductPageLocators.settingIcon)).toBeVisible();
})
       

//here this test is to validdate all product are displayed on the webpage or not All 6 products
    test("Validate Product Page",async({page})=>{

         await productPage.validateAllProductsDisplayed();
        
         //add first product to cart
        await productPage.addFirstProductToCart();

        //add all products to cart
        await productPage.addAllProductsToCart();


        })

        test("Validate adding sum or Specific product to cart",async({page})=>{

            
           const productArray = await productPage.specificProductsToCart([
                        "Sauce Labs Backpack",
                        "Sauce Labs Bolt T-Shirt",
                        "Sauce Labs Onesie"
            ]);

                console.log(productArray);


        })

        test("filter By Name A to Z",async()=>{
     
            await productPage.filterByNameAtoZ();
            //here we will call getByProductNames method 
            const names=await productPage.getProductNames();
            //we have to apply sorting method and will create copy of an array using split method[...]
            //three dots are spilt method
            const sorted=[...names].sort();
            expect(names).toEqual(sorted);
        })

        test("filter By Name Z to A",async()=>{
            await productPage.filterByNameZtoA();
            //here we will call getByProductNames method 
            const names=await productPage.getProductNames();
            //we have to apply sorting method and will create copy of an array using split method[...]
            //three dots are spilt method and reverse() method is used to reverse the order of an array
            const sorted=[...names].sort().reverse();
            
            expect(names).toEqual(sorted);
        })
        
        test.only("filter By Name Low to High",async()=>{
            
            await productPage.filterByPriceLowtoHigh();

            //here we will call getByProductPrices method
            const prices=await productPage.getProductPrices();
            const sortedPrices=[...prices].sort((a,b)=>a-b);//here a represents 1st value and b represents 2nd value
            expect(prices).toEqual(sortedPrices);
        })

        test.only("filter By Name High to Low",async()=>{

            await productPage.filterByPriceHightoLow();

            //here we will call getByProductPrices method
            const prices=await productPage.getProductPrices();
            const sortedPrice=[...prices].sort((a,b)=>b-a);//here a represents 1st value and b represents 2nd value
            expect(prices).toEqual(sortedPrice);
        })

})