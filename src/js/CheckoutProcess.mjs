import { getLocalStorage, alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    return items.map((item) => ({
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1
    }));
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key) || [];
        this.calculateItemSummary();
        this.calculateOrderTotal();
    }

    calculateItemSummary() {
        const summaryElement = document.querySelector(this.outputSelector + ' #subtotal');
        const amounts = this.list.map((item) => item.FinalPrice);
        this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
        if (summaryElement) summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2);
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const s = document.querySelector('#shipping');
        const t = document.querySelector('#tax');
        const o = document.querySelector('#orderTotal');

        if (s) s.innerText = `$${this.shipping}`;
        if (t) t.innerText = `$${this.tax}`;
        if (o) o.innerText = `$${this.orderTotal}`;
    }

    async checkout() {
        const formElement = document.forms['checkout'];

        const existing = document.querySelectorAll('.alert');
        existing.forEach(a => a.remove());

        if (!formElement.checkValidity()) {

            if (!formElement.cardNumber.checkValidity()) {
                alertMessage('Invalid Card Number: Must be 16 digits');
            }

            if (!formElement.expiration.checkValidity()) {
                alertMessage('Invalid Expiration Date');
            }

            if (!formElement.fname.checkValidity() || !formElement.lname.checkValidity()) {
                alertMessage('Please fill all required address fields');
            }

            return;
        }

        const json = formDataToJSON(formElement);
        json.orderDate = new Date().toISOString();
        json.items = packageItems(this.list);
        json.orderTotal = this.orderTotal;
        json.shipping = this.shipping;
        json.tax = this.tax;

        try {
            await services.checkout(json);

            localStorage.removeItem(this.key);
            location.assign('/cart/checkout/success.html');

        } catch (err) {
            const existingCatch = document.querySelectorAll('.alert');
            existingCatch.forEach(a => a.remove());

            const errorMessages = await err.message;

            if (errorMessages && typeof errorMessages === 'object') {
                Object.values(errorMessages).forEach(msg => {
                    alertMessage(msg);
                });
            } else {
                alertMessage(err.message || 'There was a problem with your order.');
            }
        }
    }
}