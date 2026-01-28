// getting the ids
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const productList = document.getElementById("productList");
const url = "";


searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const query = searchInput.value.trim();
    // console.log(query);
    if (!query) return;

    fetchProducts(query);
});


// funtion to fetch data from the url
async function fetchProducts(query) {
    const response = await fetch(
        `${url}?search=${query}`
    );

    const products = await response.json();
    //console.log(products);
}


// function to display sach data(to be corrected when API is given)
function renderProducts(products) {
    productList.innerHTML = "";

    products.forEach(product => {
        const div = document.createElement("div");
        div.textContent = product.name;
        productList.appendChild(div);
    });
}
renderProducts(products);


