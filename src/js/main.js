import ProductData from "./ProductData.js";
//importing the productdata
import ProductList from "./ProductList.mjs"; // importing product list


const dataSource = new ProductData("tents");//creating an instance of it
// this must match an element in your HTML
const listElement = document.getElementById("product-list");

const productList = new ProductList("tents", dataSource, listElement);

await productList.init();
console.log(productList.products);

