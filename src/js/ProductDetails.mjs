// import { getLocalStorage, setLocalStorage } from './utils.mjs';

// export default class ProductDetails {
//     constructor(productId, dataSource) {
//         this.productId = productId;   // the ID of the product
//         this.product = {};            // will store the fetched product details
//         this.dataSource = dataSource; // the ProductData instance to fetch from
//     }

//     // init method — anything that needs to happen after construction
//     async init() {
//         this.product = await this.dataSource.findProductById(this.productId);
//         this.renderProductDetails();
//     }

//     // move addProductToCart from product.js
//     addProductToCart() {
//         const cartItems = getLocalStorage('so-cart') || [];
//         cartItems.push(this.product);
//         setLocalStorage('so-cart', cartItems);
//     }

//     // method to generate/populate HTML for product details
//     renderProductDetails() {
//         // example: fill HTML elements with product info
//         const nameEl = document.querySelector('.product-name');
//         const imageEl = document.querySelector('.product-image');
//         const priceEl = document.querySelector('.product-price');

//         if (this.product && Object.keys(this.product).length > 0) {
//             if (nameEl) nameEl.textContent = this.product.Name;
//             if (imageEl) imageEl.src = this.product.Image;
//             if (priceEl) priceEl.textContent = `$${this.product.FinalPrice}`;
//         }
//     }
// }

import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;   // the ID of the product
        this.product = {};            // will store the fetched product details
        this.dataSource = dataSource; // the ProductData instance to fetch from
    }

    // init method — fetch product, render HTML, attach Add to Cart listener
    async init() {
        // fetch the product details
        this.product = await this.dataSource.findProductById(this.productId);

        // render the product on the page
        this.renderProductDetails();

        // attach click listener to the Add to Cart button
        // use .bind(this) so "this" refers to the class instance inside the callback
        const addToCartButton = document.getElementById('addToCart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', this.addProductToCart.bind(this));
        }
    }

    // add the current product to localStorage cart
    addProductToCart() {
        const cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }

    // render the product details in HTML
    renderProductDetails() {
        const brandEl = document.querySelector('.product-detail h3');
        const nameEl = document.querySelector('.product-detail h2');
        const imageEl = document.querySelector('.product-detail img');
        const priceEl = document.querySelector('.product-card__price');
        const descEl = document.querySelector('.product__description');

        if (this.product && Object.keys(this.product).length > 0) {

            if (brandEl) brandEl.textContent = this.product.Brand.Name;
            if (nameEl) nameEl.textContent = this.product.NameWithoutBrand;

            if (imageEl) {
                imageEl.src = this.product.Image.replace('../', '/');
                imageEl.alt = this.product.Name;
            }

            if (priceEl) priceEl.textContent = `$${this.product.FinalPrice}`;
            if (descEl) descEl.innerHTML = this.product.DescriptionHtmlSimple;
        }
    }
}

// DECIDED TO USE THE TEACHERS SOLUTION AFTER COMPARING TO PREVENT ANY BREAK OF CODE IN THE LONG RUN, ALTHOUGH WE WORKED OUR STEPS ABOVE.

// import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// export default class ProductDetails {

//     constructor(productId, dataSource) {
//         this.productId = productId;
//         this.product = {};
//         this.dataSource = dataSource;
//     }

//     async init() {
//         // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//         this.product = await this.dataSource.findProductById(this.productId);
//         // the product details are needed before rendering the HTML
//         this.renderProductDetails();
//         // once the HTML is rendered, add a listener to the Add to Cart button
//         // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand why.
//         document
//             .getElementById('addToCart')
//             .addEventListener('click', this.addProductToCart.bind(this));
//     }

//     addProductToCart() {
//         const cartItems = getLocalStorage("so-cart") || [];
//         cartItems.push(this.product);
//         setLocalStorage("so-cart", cartItems);
//     }

//     renderProductDetails() {
//         productDetailsTemplate(this.product);
//     }
// }

// function productDetailsTemplate(product) {
//     document.querySelector('h2').textContent = product.Brand.Name;
//     document.querySelector('h3').textContent = product.NameWithoutBrand;

//     const productImage = document.getElementById('productImage');
//     productImage.src = product.Image;
//     productImage.alt = product.NameWithoutBrand;

//     document.getElementById('productPrice').textContent = product.FinalPrice;
//     document.getElementById('productColor').textContent = product.Colors[0].ColorName;
//     document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

//     document.getElementById('addToCart').dataset.id = product.Id;
// }
