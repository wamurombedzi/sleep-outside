import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);

myList.init();

const categoryElement = document.querySelector('#category-name');

if (categoryElement && category) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    categoryElement.textContent = formattedCategory;
}