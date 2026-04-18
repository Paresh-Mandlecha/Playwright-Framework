import {page} from '@playwright/test';
import { CartPageLocators } from '../locators/cartPageLocators';

export class CartPage{

    constructor(page){
        this.page=page;
    }
        async clickOncontinueShopping(){

            await this.page.locator(CartPageLocators.continueShoppingButton).click();
        }

        async getCartPageElements(){

            return{
                carTitle: this.page.locator(CartPageLocators.cartTitle),
                shoppingCart: this.page.locator(CartPageLocators.cartLink),
                checkOut: this.page.locator(CartPageLocators.checkoutButton)
            }
        }


        async getCartProductDetails() {
             const names = await this.page.locator(CartPageLocators.productNames).allTextContents();
             const descriptions = await this.page.locator(CartPageLocators.productDescription).allTextContents(); 
             const prices = await this.page.locator(CartPageLocators.productPrices).allTextContents(); 

                const allcartProducts = names.map((name, i) => ({
                name: name.trim(),
                description: descriptions[i].trim(),
                price: prices[i].trim()
  }));

  return allcartProducts;
}

        async removeFirstProduct(){
            await this.page.locator(CartPageLocators.removeButton).click();
        }

}