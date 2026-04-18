export const ProductPageLocators = {

    settingIcon:'#react-burger-menu-btn',
    logoutlink:'#logout_sidebar_link',
    Aboutlink:'#about_sidebar_link',
    requestDemoButton:"button:has-text('Request a demo')",
    tryItFree:"button:has-text('Try it free')",
    productNames:".inventory_item_name",//here it is class so we have to keep " . "
    productDescription:".inventory_item_desc",
    productPrices:".inventory_item_price",
    addToCartButton:".btn.btn_small.btn_inventory",
    filterDropDown:".product_sort_container",
    filterNameAtoZ:"option[value='az']",//CSS custom locator //these are for dropdown filter
    filterNameZtoA:"option[value='za']",
    filterPriceLowtoHigh:"option[value='lohi']",
    filterPriceHightoLow:"option[value='hilo']",
    cartLink:".shopping_cart_link"
}