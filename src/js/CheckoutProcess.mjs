import { getLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

// Helper function to convert form data to a clean JSON object
function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach(function (value, key) {
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

        if (summaryElement) {
            summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
        }
    }

    calculateOrderTotal() {
        this.tax = (this.itemTotal * 0.06).toFixed(2);

        if (this.list.length > 0) {
            this.shipping = 10 + (this.list.length - 1) * 2;
        } else {
            this.shipping = 0;
        }

        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.tax) +
            parseFloat(this.shipping)
        ).toFixed(2);

        this.displayOrderTotals();
    }

    displayOrderTotals() {
        const shippingElement = document.querySelector(this.outputSelector + ' #shipping');
        const taxElement = document.querySelector(this.outputSelector + ' #tax');
        const orderTotalElement = document.querySelector(this.outputSelector + ' #orderTotal');

        if (shippingElement) shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
        if (taxElement) taxElement.innerText = `$${this.tax}`;
        if (orderTotalElement) orderTotalElement.innerText = `$${this.orderTotal}`;
    }

    async checkout() {
        const formElement = document.forms['checkout'];
        const json = formDataToJSON(formElement);

        json.orderDate = new Date().toISOString();
        json.items = packageItems(this.list);
        json.orderTotal = this.orderTotal;
        json.shipping = this.shipping;
        json.tax = this.tax;
        // eslint-disable-next-line no-console
        console.log('Sending order:', json);

        try {
            const res = await services.checkout(json);
            // eslint-disable-next-line no-console
            console.log('Server response:', res);

            localStorage.removeItem(this.key);
            alert('Order Placed Successfully!');
            location.assign('/cart/checkedout.html');

        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Checkout error:', err);
        }
    }
}