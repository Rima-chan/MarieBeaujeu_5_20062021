const CONTAINER = document.querySelector('#productsContainer');
const PRODUCT_BUTTONS = document.querySelectorAll('.productButton');

// Asynchrone function (awaits resolved promise) to recover API cameras data 
(async () => {
    try {
        const config = await loadConfig();
        const response = await fetch(`${apiUrl}` + config.apiCategories.cameras);
        const data = await response.json();
        for (element of data) {
            let product = new Product(element._id, element.name, element.price, element.description, element.imageUrl, element.lenses);
            displayProduct(product);
        }
    } catch(error) {
        console.log("Error : " + error);
    }
})();

// Create an HTML template for each product and display it
function displayProduct(product) {
    const TEMPLATE = `<div class="col-12 col-md-6 d-flex">
                            <article class="card my-3 shadow-sm">
                                <img src="${product.image}"class="card-img-top img-responsive flex-fill" alt="photographie du modèle ${product.name}">
                                <div class="card-body d-flex flex-column">
                                    <h2 class="card-title">${product.name}</h2>
                                    <p class="card-text flex-fill">${product.description}</p>
                                    <a href="../product/product.html?id=${product.id}" class="btn btn-dark stretched-link justify-content-center mx-auto px-3 py-2 productButton">Voir ce produit</a>
                                </div>
                            </article>
                        </div>`;
    CONTAINER.insertAdjacentHTML('afterbegin', TEMPLATE);
}

