import { loadHeaderFooter } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

async function init() {
  try {
    await loadHeaderFooter();

    const myCheckout = new CheckoutProcess('so-cart', '#order-summary');
    myCheckout.init();

    const btn = document.querySelector('#checkout-submit');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const myForm = document.forms['checkout'];
        if (myForm.checkValidity()) {
          myCheckout.checkout();
        } else {
          myForm.reportValidity();
        }
        myCheckout.checkout();
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error inicializando el checkout:', err);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
