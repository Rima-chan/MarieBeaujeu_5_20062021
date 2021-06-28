// SELECTEURS
const CONTAINER = document.querySelector('#shopContainer');
const TOTAL_PRODUCT = document.querySelector('#totalPrice');
const TOTAL_ORDER = document.querySelector('#totalOrder');
const FORM_ORDER = document.querySelector('#formOrder');

let productsInShop =  getProductsInShop();
let totalPrice = 0;


// ECOUTEUR 

FORM_ORDER.addEventListener('submit', function(e) {
    e.preventDefault();
    if (productsInShop.length === 0) {
        alert("Votre panier est vide");
        
    } else {
        createOrder();
    }
});

// FONCTIONS



for (product of productsInShop) {
        let productShop = new Product(product.id, product.name, product.price, product.description, product.image, product.options);
        productShop.quantity = product.quantity;
        let total = calculProductsPrice(product);
        totalPrice += total/100;
        console.log(total);
        // console.log(productShop);
        displayProduct(productShop);
}
document.querySelectorAll('.closeBtn').forEach(btn => {
    btn.addEventListener('click', updateShopCart);
})

TOTAL_PRODUCT.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((totalPrice)) + " €";
calculAmountOrder();


function displayProduct(product) {
    const TEMPLATE = `<div class="card shadow-sm mb-3" data-id="${product.id}">
                        <div class="card-header container-fluid"> 
                            <div class="row">
                                <div class="col"> 
                                    <h3 class="modal-title h5">${product.name}</h3>
                                </div>
                                <div class="col-1 float-left p-0"> 
                                    <button type="button" class="btn close closeBtn" aria-label="Close" data-id="${product.id}" data-option="${product.options}" data-quantity="${product.quantity}" data-price="${product.price}" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer du panier">
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
                                    <p class="card-text">Quantité : ${product.quantity}</p>
                                    <p class="card-text price">${product.getFormatedPrice()} €</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    CONTAINER.insertAdjacentHTML('beforeend', TEMPLATE);
}


function updateShopCart(e) {
    const ID = this.dataset.id;
    const OPTION = this.dataset.option;
    const QUANTITY = this.dataset.quantity;
    const PRICE = this.dataset.price;
    const CARD_CONTAINER = e.target.closest('.card');
    updateProductPrice(parseInt(PRICE), parseInt(QUANTITY));
    calculAmountOrder();
    removeNbOfItems(QUANTITY);
    removeFromShopCart(ID, OPTION);
    CARD_CONTAINER.remove();
}

function calculProductsPrice(product) {
    let total = product.price * product.quantity;
    return total;
}

function updateProductPrice(price, quantity) {
    totalPrice -= (price/100 * quantity);
    TOTAL_PRODUCT.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((totalPrice)) + " €";
}

function calculAmountOrder() {
    let totalProduct = totalPrice;
    let totalShipping = 0;
    let totalOrder = totalProduct + totalShipping;
    TOTAL_ORDER.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((totalOrder)) + " €";
}

function createOrder() {
    var valid = true;
    for (let input of document.querySelectorAll('#formOrder input')) {
        valid &= input.reportValidity();
        if (!valid) {
            break;
        } 
    }
    if(valid) {
        let firstName = document.querySelector('#inputFirstName').value;
        let lastName = document.querySelector('#inputLastName').value;
        let address = document.querySelector('#inputAddress').value;
        let city = document.querySelector('#inputCity').value + " " + document.querySelector('#inputPostCode');
        let email = document.querySelector('#inputEmail').value;
        let order = new Order(firstName, lastName, address, city, email);
        order.productsOrdered = productsInShop;
        console.log(order);
    }
}