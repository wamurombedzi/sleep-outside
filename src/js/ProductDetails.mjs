import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        const addToCartButton = document.getElementById('addToCart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', this.addProductToCart.bind(this));
        }
    }

    addProductToCart() {
        const cartItems = getLocalStorage('so-cart') || [];
        cartItems.push(this.product);
        setLocalStorage('so-cart', cartItems);
    }

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
                imageEl.src = this.product.Images.PrimaryLarge;
                imageEl.alt = this.product.Name;
            }

            if (priceEl) priceEl.textContent = `$${this.product.FinalPrice}`;
            if (descEl) descEl.innerHTML = this.product.DescriptionHtmlSimple;
        }
    }
}
