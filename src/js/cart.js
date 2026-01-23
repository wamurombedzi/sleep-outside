import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart(
  'so-cart',
  document.querySelector('.product-list'),
);
cart.init();

// import { getLocalStorage, loadHeaderFooter } from './utils.mjs';
// import { validateQuantity, showFeedbackMessage } from './cartvalidation.js';

// loadHeaderFooter();

// let cart = getLocalStorage('so-cart') || [];

// function renderCartContents() {
//   const htmlItems = cart.map((item) => cartItemTemplate(item));
//   document.querySelector('.product-list').innerHTML = htmlItems.join('');
// }

// function cartItemTemplate(item) {
//   return `<li class='cart-card divider'>
//   <a href='#' class='cart-card__image'>
//     <img src='${item.Image}' alt='${item.Name}' />
//   </a>
//   <a href='#'>
//     <h2 class='card__name'>${item.Name}</h2>
//   </a>
//   <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
//   <p class='cart-card__quantity'>qty: 1</p>
//   <p class='cart-card__price'>$${item.FinalPrice}</p>
// </li>`;
// }

// renderCartContents();

// function updateCartItemQuantity(itemId, newQuantity) {
//   const validation = validateQuantity(newQuantity);

//   if (!validation.isValid) {
//     showFeedbackMessage(validation.message);
//     const input = document.querySelector(`[data-id='${itemId}]`);
//     const item = cart.find(i => i.id === itemId);
//     if (input && item) {
//       input.value = item.quantity;
//     }
//     return;
//   }

//   const itemIndex = cart.findIndex(item => item.id === itemId);
//   if (itemIndex > -1) {
//     cart[itemIndex].quantity = parseInt(newQuantity);
//     localStorage.setItem('so-cart', JSON.stringify(cart));

//     renderCartContents();
//     showFeedbackMessage('quantity update successfully', false)
//   }
// }

// // import { getLocalStorage } from './utils.mjs';

// // function renderCartContents() {
// //   const cartItems = getLocalStorage('so-cart');
// //   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
// //   document.querySelector('.product-list').innerHTML = htmlItems.join('');
// // }

// // function cartItemTemplate(item) {
// //   const newItem = `<li class='cart-card divider'>
// //   <a href='#' class='cart-card__image'>
// //     <img
// //       src='${item.Image}'
// //       alt='${item.Name}'
// //     />
// //   </a>
// //   <a href='#'>
// //     <h2 class='card__name'>${item.Name}</h2>
// //   </a>
// //   <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
// //   <p class='cart-card__quantity'>qty: 1</p>
// //   <p class='cart-card__price'>$${item.FinalPrice}</p>
// // </li>`;

// //   return newItem;
// // }

// // renderCartContents();

// // //integration with cartvalidation.js
// // import { validateQuantity, showFeedbackMessage } from './cartvalidation.js';

// // function updateCartItemQuantity(itemId, newQuantity) {
// //   const validation = validateQuantity(newQuantity);

// //   if (!validation.isValid) {
// //     showFeedbackMessage(validation.message);
// //     // Restore original value
// //     const input = document.querySelector(`[data-id="${itemId}"]`);
// //     const item = cart.find(i => i.id === itemId);
// //     if (input && item) {
// //       input.value = item.quantity;
// //     }
// //     return;
// //   }

// //   // Proceed with valid update
// //   const itemIndex = cart.findIndex(item => item.id === itemId);
// //   if (itemIndex > -1) {
// //     cart[itemIndex].quantity = parseInt(newQuantity);
// //     saveCartToStorage(cart);
// //     renderCartItems();
// //     showFeedbackMessage("Quantity updated successfully", false);
// //   }
// // }
