import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.ListPrice}</p>
    </a>
  </li>`;
}


//styling the elements above
function addProductCardStyles() {
    const style = document.createElement("style");
    style.textContent = `
    /* Container */
    #product-list {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      list-style: none;
      padding: 0;
    }

    /* Product Card */
    .product-card {
      border: 1px solid #ddd;
      border-radius: 10px;
      padding: 10px;
      width: 200px;
      text-align: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      background-color: #fff;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    .product-card img {
      max-width: 100%;
      border-radius: 5px;
    }

    .product-card h2.card__brand {
      font-size: 14px;
      color: #555;
      margin: 8px 0 4px;
    }

    .product-card h3.card__name {
      font-size: 16px;
      margin: 4px 0;
      color: #333;
    }

    .product-card p.product-card__price {
      font-weight: bold;
      color: #e60023;
      margin-top: 8px;
    }

    /* Responsive */
    @media (max-width: 600px) {
      .product-card {
        width: 100%;
      }
    }
  `;
    document.head.appendChild(style);
}

// Calling this before rendering
addProductCardStyles();


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.products = [];
    }

    async init() {
        this.products = await this.dataSource.getData();
    }

    // renderList(productList) {
    //     this.listElement.innerHTML = productList
    //         .map((product) => productCardTemplate(product))
    //         .join("");
    // }
    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products);
    }


   
}

