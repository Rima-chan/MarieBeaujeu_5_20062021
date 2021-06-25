// SELECTEURS
const CONTAINER = document.querySelector('#shopContainer');

// ECOUTEUR 
// CONTAINER.addEventListener('click', updateShopCart);

// FONCTIONS
(async function(){
    let productsInShop = await getProductsInShop();
    for (product of productsInShop) {
        // let productShop = new Product(product.id, product.name, product.price, product.description, product.image, product.options);
        let productShop = createProduct(product);
        // console.log(productShop);
        displayProduct(productShop);
    }
    document.querySelectorAll('.closeBtn').forEach(btn => {
        btn.addEventListener('click', updateShopCart);
    })
    
})()


// Crée un objet "produit" // Ca marche aussi en le mettant directement dans la fonction asyn :
// let pdt = New Product(product.name, etc....)
function createProduct(element) {
    let newProduct = new Product(element.id, element.name, element.price, element.description, element.image, element.options);
    // product[newProduct.id] = newProduct;
    return newProduct;
}



function displayProduct(product) {
    const TEMPLATE = `<div class="card shadow-sm mb-3" data-id="${product.id}">
                        <div class="card-header container-fluid"> 
                            <div class="row">
                                <div class="col"> 
                                    <h3 class="modal-title h5">${product.name}</h3>
                                </div>
                                <div class="col-1 float-left p-0"> 
                                    <button type="button" class="btn close closeBtn" aria-label="Close" data-id="${product.id}" data-option="${product.options}" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer du panier">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div> 
                        <div class="row g-0">
                            <div class="col-md-4"> 
                                <img src="${product.image}" class="card-img img-responsive" alt="photographie du produit ${product.name}">
                            </div>
                            <div class="col-md-8"> 
                                <div class="card-body">
                                    <p class="card-text">Option : ${product.options}</p>
                                    <p class="card-text">${product.getFormatedPrice()} €</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    CONTAINER.insertAdjacentHTML('beforeend', TEMPLATE);
}


function updateShopCart(e) {
    let id = this.dataset.id;
    let option = this.dataset.option;
    let cardContainer = e.target.closest('.card');
    removeFromShopCart(id, option);
    cardContainer.remove();
}


