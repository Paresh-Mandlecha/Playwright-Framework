//step1:  here we create a locators file and store the elements
//  by using export we can use these obejcts or locators outside of the class or file. 
// we can import these locators in the page file and use them in the functions.
export const LoginLocators = {

    //here we create the variables and store the elements in these variables. 
    // we can use these variables in the page file and use them in the functions.
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton:'#login-button'
    //we have to use this above locaators in login page.
}   