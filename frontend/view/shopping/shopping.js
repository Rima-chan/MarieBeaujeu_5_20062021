// SELECTEURS
const CONTAINER = document.querySelector('#shopContainer');

// ECOUTEUR 
CONTAINER.addEventListener('click', updateShopCart);

// FONCTIONS
(async function(){
    let productsInShop = await getProductsInShop();
    for (product of productsInShop) {
        // console.log(Object.keys(product));
        let productShop = createProduct(product);
        console.log(productShop);
        displayProduct(productShop);
    }
    
})()

// Crée un objet "produit" 
function createProduct(element) {
    let key = Object.keys(element);
    let newProduct = new Product(element[key].id, element[key].name, element[key].price, element[key].description, element[key].image, element[key].options);
    product[newProduct.id] = newProduct;
    return newProduct;
}

function displayProduct(product) {
    const TEMPLATE = `<div class="card shadow-sm mb-3">
                        <div class="row">
                            <div class="card-header bg-transparent border-0 text-end p-0 mr-3">
                                <button type="button" class="btn close closeBtn" aria-label="Close" data-id="${product.id}">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="col-md-4">
                                <img src="${product.image}" class="card-img" alt="photographie du produit ${product.name}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h3 class="card-title h5">${product.name}</h3>
                                    <p class="card-text">Options : ${product.options}</p>
                                    <p class="card-text">${product.getFormatedPrice()} €</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    CONTAINER.insertAdjacentHTML('beforeend', TEMPLATE);
}


function updateShopCart(e) {
    console.log(e.target);
    // Le bouton est pour le moment en dessous de la card body : soit créer un bouton / soit faire autrement avec boostrap
}