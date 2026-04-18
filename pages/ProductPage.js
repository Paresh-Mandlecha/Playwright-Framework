import {page} from '@playwright/test';
import { ProductPageLocators } from '../locators/ProductPageLocators';

export class ProductPage{
    constructor(page){
        this.page=page;
    }

    async logout(){
       await this.page.click(ProductPageLocators.settingIcon);
       await this.page.click(ProductPageLocators.logoutlink);
      
    }

    async openAboutPage(){
        await this.page.click(ProductPageLocators.settingIcon);
        await this.page.click(ProductPageLocators.Aboutlink);
    }

    async validateAllProductsDisplayed(){

        const names = await this.page.locator(ProductPageLocators.productNames).allTextContents();
        const descriptions= await this.page.locator(ProductPageLocators.productDescription).allTextContents();
        const price =await this.page.locator(ProductPageLocators.productPrices).allTextContents();
        const addtocartbuttoncount=await this.page.locator(ProductPageLocators.addToCartButton).count();

        //validate atleast one product is displayed on the page
        //here we will apply if condition that no product is found
        if(names.length===0)//here zero means no product displayed
            throw new Error("No Products Found");

            if(names.length!==descriptions.length || names.length!==price.length || names.length!==addtocartbuttoncount)
                throw new Error("Mismatch Between product details")
    }

    //here we will validate by addding first product to cart
    async addFirstProductToCart(){

            await this.page.locator(ProductPageLocators.addToCartButton).first().click();

    }

    //here we will add all products to cart
    async addAllProductsToCart(){
        const buttons=this.page.locator(ProductPageLocators.addToCartButton);
        
        const count = await buttons.count();

        for(let i=0;i<count;i++){
            //here we will count add to cart button and we will click on each button
            await buttons.nth(i).click();
            await this.page.waitForTimeout(3000);
        }
    }

    async specificProductsToCart(productName){

        const addProducts = this.page.locator(ProductPageLocators.productNames);
        //count the added products to cart
        const count = addProducts.count();
        for(let i=0;i<count;i++){
            const name = await addProducts.nth(i).textContent();
            if(name && productName.includes(name.trim())){
                await this.page.locator(ProductPageLocators.addToCartButton).nth(i).click();
                await this.page.waitForTimeout(5000);
            }
        }
        
    }

    async filterByNameAtoZ(){
        await this.page.selectOption(ProductPageLocators.filterDropDown,"az");
        await this.page.waitForTimeout(3000);
    }
    
    async filterByNameZtoA(){
        await this.page.selectOption(ProductPageLocators.filterDropDown,"za");
        await this.page.waitForTimeout(3000);
       
    }
    async filterByPriceLowtoHigh(){
        await this.page.selectOption(ProductPageLocators.filterDropDown,"lohi");
        await this.page.waitForTimeout(3000);
    }
    async filterByPriceHightoLow(){
        await this.page.selectOption(ProductPageLocators.filterDropDown,"hilo")
        await this.page.waitForTimeout(3000);

    }

    //here we will collect product names and we will return product names to spec file
    async getProductNames(){

        //here we will use return keyword to return names to spec file
        return this.page.locator(ProductPageLocators.productNames).allTextContents();
    }

    async getProductPrices(){
        const prices=await this.page.locator(ProductPageLocators.productPrices).allTextContents();

        //here we will remoove $ symbol and will get just number
        //here price is variable and we have used parsefloat because
        //  firstly price is in string so it will convert into float
        return prices.map(price =>parseFloat(price.replace('$','')));
    }

    //create method to click on cartlink
    async clickOnCartLink(){

        await this.page.click(ProductPageLocators.cartLink);
    }

    async getFirstProductDetails(){

        const name=await this.page.locator(ProductPageLocators.productNames).first().textContent();
        const description=await this.page.locator(ProductPageLocators.productDescription).first().textContent();
        const price=await this.page.locator(ProductPageLocators.productPrices).first().textContent();

        //here we will create object return below details all to spec file
        return{
            name:name,//it will return sauce labs backpack
            description:description,//it will return its description
            price:price //it will return its price
        }
    } 

    async getAllProductDetails(){

        const allNames=await this.page.locator(ProductPageLocators.productNames).allTextContents();
        const allDescription=await this.page.locator(ProductPageLocators.productDescription).allTextContents();
        const allPrices=await this.page.locator(ProductPageLocators.productPrices).allTextContents();

        //here i is index and _ is javascript variable where i dont want to use and will concentrate using index
        const allProducts=allNames.map((_,i)=>({

            name:allNames[i].trim(),//it will get corresponding name of a product which is in same index
            description:allDescription[i].trim(),//it will get corresponding description of a product which is in same index
            price:allPrices[i].trim() //it will get corresponding price of a product which is in same index

        }))
        //here we will create array object [{name},{description},{price}]return below details all to spec file
        return allProducts;
    }

    async getSpecificProductDetails(productName){

        const allNames=await this.page.locator(ProductPageLocators.productNames).allTextContents();
        const allDescription=await this.page.locator(ProductPageLocators.productDescription).allTextContents();
        const allPrices=await this.page.locator(ProductPageLocators.productPrices).allTextContents();

        //here i is index and _ is javascript variable where i dont want to use and will concentrate using index
        const allProducts=allNames.map((_,i)=>({

            name:allNames[i].trim(),//it will get corresponding name of a product which is in same index
            description:allDescription[i].trim(),//it will get corresponding description of a product which is in same index
            price:allPrices[i].trim() //it will get corresponding price of a product which is in same index


        }))
        //here we will filter product by name and will return specific product details to spec file
        return allProducts.filter(p => productName.includes(p.name));      

    }

}