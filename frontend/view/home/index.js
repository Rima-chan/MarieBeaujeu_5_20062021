
// SELECTEURS 
const CONTAINER = document.querySelector('#productsContainer');
const PRODUCT_BUTTONS = document.querySelectorAll('.productButton');

// VARIABLES & CONSTANTES
const URL = "http://localhost:3000/api/cameras";
let productList = [];

// ECOUTEURS




// FONCTIONS

// Requete Fetch pour récupérer la liste de produits
fetch(URL)
.then(response => response.json())
.then(data => {
    for (element of data) {
        let newProduct = createProduct(element);
        displayProduct(newProduct);
        // console.log(newProduct);
    }
    console.log(productList);
})
.catch(error => console.log("Error : " + error))

// Crée un objet "produit" 
function createProduct(element) {
    let newProduct = new Product(element._id, element.name, element.price, element.description, element.imageUrl, element.lenses);
    productList[newProduct.id] = newProduct;
    return newProduct;
}

// Affiche le produit sur la page HTML
function displayProduct(product) {
    const TEMPLATE = `<div class="col-12 col-md-6">
                            <article class="card my-3 shadow-sm">
                                <img src="${product.image}"class="card-img-top img-responsive" alt="photographie du modèle ${product.name}">
                                <div class="card-body">
                                    <h2 class="card-title">${product.name}</h2>
                                    <p class="card-text">${product.description}</p>
                                    <a href="../product/product.html?id=${product.id}" class="btn btn-dark stretched-link productButton">Voir ce produit</a>
                                </div>
                            </article>
                        </div>`;
    CONTAINER.insertAdjacentHTML('afterbegin', TEMPLATE);
}
