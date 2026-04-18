//STEP2:here we have to import loginlocators username,password and loginButton


import { LoginLocators } from "../locators/LoginLocators";  
import {page} from "@playwright/test";

//create a class and export it so that we can use this class in the test file.
export class LoginPage{

    constructor(page){
        this.page=page;
    }
            //here we have to create login method and pass username and password as argument from loginlocators.js file
        async login(username,password){
        await this.page.fill(LoginLocators.usernameInput,username);
        await this.page.fill(LoginLocators.passwordInput, password);
        await this.page.click(LoginLocators.loginButton);
    }
}