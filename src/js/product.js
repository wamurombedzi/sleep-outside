// import { getLocalStorage, setLocalStorage } from './utils.mjs';
// import ProductData from './ProductData.mjs';
// import { getParam } from './utils.mjs';

// const dataSource = new ProductData('tents');
// const productId = getParam('product');

// //console.log(dataSource.findProductById(productId));
// // testing the product
// // async function testProduct() {
// //   const product = await dataSource.findProductById(productId);
// //   console.log(product);
// // }

// // testProduct();


// function addProductToCart(product) {
//   const cartItems = getLocalStorage('so-cart') || [];
//   cartItems.push(product);
//   setLocalStorage('so-cart', cartItems);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById('addToCart')
//   .addEventListener('click', addToCartHandler);


import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Step 1: Get product ID from URL
const productId = getParam('product');

// Step 2: Create ProductData instance
const dataSource = new ProductData('tents');

// Step 3: Create ProductDetails instance
const product = new ProductDetails(productId, dataSource);

// Step 4: Initialize the ProductDetails instance
product.init();

// WORKED EXACTLY AS TEACHERS