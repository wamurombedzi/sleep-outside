import ProductData from './ProductData.mjs';
//importing the productdata
import ProductList from './ProductList.mjs'; // importing product list


const dataSource = new ProductData('tents');//creating an instance of it

const listElement = document.getElementById('product-list');

const productList = new ProductList('tents', dataSource, listElement);


async function showProducts() {
    await productList.init();
    productList.renderList(productList.products);
}

showProducts();

await productList.init();
console.log(productList.products);

