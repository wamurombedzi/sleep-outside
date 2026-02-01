import { getLocalStorage } from './utils.mjs';


// En ShoppingCart.mjs, cambia la función cartItemTemplate:
function cartItemTemplate(item) {
    // Intentamos obtener la imagen de las formas más comunes en este proyecto
    const imagePath = item.Image || (item.Images && item.Images.PrimaryLarge);

    return `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img
                src="${imagePath}" 
                alt="${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;
}

// function cartItemTemplate(item) {
//     const newItem = `<li class="cart-card divider">
//         <a href="#" class="cart-card__image">
//             <img
//                 src="/images/${item.image || item.Image}"
//                 alt="${item.Name}"
//             />
//         </a>
//         <a href="#">
//             <h2 class="card__name">${item.Name}</h2>
//         </a>
//         <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//         <p class="cart-card__quantity">qty: 1</p>
//         <p class="cart-card__price">$${item.FinalPrice}</p>
//     </li>`;

//     return newItem;
// }

export default class ShoppingCart {
    constructor(key, parentElement) {
        this.key = key;
        this.parentElement = parentElement;
        this.total = 0;
    }

    init() {
        const cartItems = getLocalStorage(this.key) || [];
        this.renderCartContents(cartItems);
    }

    renderCartContents(items) {
        const htmlItems = items.map((item) => cartItemTemplate(item));
        this.parentElement.innerHTML = htmlItems.join('');

        if (items.length > 0) {
            this.calculateListTotal(items);
        }
    }

    calculateListTotal(items) {
        const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);
        this.total = total;

        const cartFooter = document.querySelector('.cart-footer');
        const totalElement = document.querySelector('.cart-total');

        cartFooter.classList.remove('hide');
        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    }
}