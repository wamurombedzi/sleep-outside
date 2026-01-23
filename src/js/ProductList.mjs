import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        const filteredList = this.filterList(list);
        this.renderList(filteredList);
    }

    filterList(list) {
        const requiredIds = ['880RR', '985RF', '985PR', '344YJ'];
        return list.filter((product) => requiredIds.includes(product.Id));
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
    }
}

function productCardTemplate(product) {
    const discountAmount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    const discountTag = product.FinalPrice < product.SuggestedRetailPrice
        ? `<p class="discount-flag">Save $${discountAmount}!</p>`
        : '';

    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Image.replace('../', '/')}" alt="Image of ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      ${discountTag} <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}
