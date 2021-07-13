const CONTAINER = document.querySelector('#shopContainer');
const TOTAL_PRODUCT = document.querySelector('#totalPrice');
const TOTAL_ORDER = document.querySelector('#totalOrder');
const FORM_ORDER = document.querySelector('#formOrder');

let productsInShop =  getProductsInShop();
let totalPrice = 0;

let products = [];
let contact = {};

/****** DISPLAY AND UPDATE SHOP CART *****/

// Displays each product in shop cart
// Listens clic on products' close button
for (product of productsInShop) {
        let productShop = new Product(product.id, product.name, product.price, product.description, product.image, product.options);
        productShop.quantity = product.quantity;
        totalPrice += (productShop.quantity * productShop.price) / 100;
        displayProduct(productShop);
}
document.querySelectorAll('.closeBtn').forEach(btn => {
    btn.addEventListener('click', updateShopCart);
})

// Displays total price
TOTAL_PRODUCT.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((totalPrice)) + " €";
calculAmountOrder();

// Creates an HTML template for each product and displays it
function displayProduct(product) {
    const TEMPLATE = `<div class="card shadow-sm mb-3" data-id="${product.id}">
                        <div class="card-header container-fluid"> 
                            <div class="row">
                                <div class="col-10 my-auto"> 
                                    <h3 class="modal-title h5">${product.name}</h3>
                                </div>
                                <div class="col-2 d-flex justify-content-end p-0"> 
                                    <button type="button" class="btn close closeBtn" aria-label="Close" data-id="${product.id}" data-option="${product.options}" data-quantity="${product.quantity}" data-price="${product.price}" data-bs-toggle="tooltip" data-bs-placement="top" title="Supprimer du panier">
                                        <span aria-hidden="true" class="h4">&times;</span>
                                    </button>
                                </div>
                            </div>
                        </div> 
                        <div class="row g-0">
                            <div class="col-md-4 d-flex">
                                <a href="../product/product.html?id=${product.id}"> 
                                    <img src="${product.image}" class="card-img img-responsive" alt="photographie du produit ${product.name}">
                                </a>    
                            </div>
                            <div class="col-md-8"> 
                                <div class="card-body py-2">
                                    <p class="card-text m-1">Option : ${product.options}</p>
                                    <p class="card-text m-1">Quantité : ${product.quantity}</p>
                                    <p class="card-text m-1 price">${product.getFormatedPrice()} €</p>
                                </div>
                            </div>
                        </div>
                    </div>`;
    CONTAINER.insertAdjacentHTML('beforeend', TEMPLATE);
}

// Udpate shop cart when clicking on the close button
function updateShopCart(e) {
    const ID = this.dataset.id;
    const OPTION = this.dataset.option;
    const QUANTITY = this.dataset.quantity;
    const PRICE = this.dataset.price;
    const CARD_CONTAINER = e.target.closest('.card');
    updateProductsPrice(parseInt(PRICE), parseInt(QUANTITY));
    calculAmountOrder();
    removeNbOfItems(QUANTITY);
    removeFromShopCart(ID, OPTION);
    CARD_CONTAINER.remove();
}

// Update total price according to a price and a quantity
function updateProductsPrice(price, quantity) {
    totalPrice -= (price/100 * quantity);
    TOTAL_PRODUCT.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((totalPrice)) + " €";
}

// Calcul total amount order
function calculAmountOrder() {
    let totalShipping = 0;  // To define later
    let totalOrder = totalPrice + totalShipping;
    TOTAL_ORDER.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((totalOrder)) + " €";
}

/******** GET BACK AND SENDING DATA ON SERVER *********/

// Check if the submitted form is not empty and goes one
FORM_ORDER.addEventListener('submit', function(e) {
    e.preventDefault();
    let productsOrdered = getProductsInShop();
    if (productsOrdered.length === 0) {
        alert("Votre panier est vide");
    } else {
        createOrder();
    }
});

// Check if every inputs form are valid 
// Creates an order object and sends it by POST method
// Save order infos in localStorage
// Redirects to confirmation page
function createOrder() {
    var valid = true;
    for (let input of document.querySelectorAll('#formOrder input')) {
        valid &= input.reportValidity();
        if (!valid) {
            break;
        } 
    }
    if(valid) {
        let contact = new Object();
        contact.firstName = document.querySelector('#inputFirstName').value;
        contact.lastName = document.querySelector('#inputLastName').value;
        contact.address = document.querySelector('#inputAddress').value
        contact.city =  document.querySelector('#inputCity').value + " " + document.querySelector('#inputPostCode').value;
        contact.email = document.querySelector('#inputEmail').value;
        let productsOrdered = getProductsInShop();
        productsOrdered.forEach(product => products.push(product.id));
        
        const orderToSend = {
            "contact" : contact,
            "products" : products,
        };
        const promiseOrder = fetch(`${apiUrl}` + `/api/cameras/order`, {
            method: "POST",
            body : JSON.stringify(orderToSend),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        promiseOrder.then(async(response) => {
            try {
                localStorage.clear();
                const order = await response.json();
                localStorage.setItem("contact", JSON.stringify(order));
                localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                window.location.href = "confirmation.html";

            } catch(error) {
                console.log("Error : " + error);
            }
        });
    }
}
