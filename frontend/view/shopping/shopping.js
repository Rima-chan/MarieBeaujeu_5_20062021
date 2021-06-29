// SELECTEURS
const CONTAINER = document.querySelector('#shopContainer');
const TOTAL_PRODUCT = document.querySelector('#totalPrice');
const TOTAL_ORDER = document.querySelector('#totalOrder');
const FORM_ORDER = document.querySelector('#formOrder');

let productsInShop =  getProductsInShop();
let totalPrice = 0;

let products = [];
let contact = {};

/****** PARTIE AFFICHAGE ET MISE A JOUR DU PANIER *****/

// Affiche chaque produit du panier
for (product of productsInShop) {
        let productShop = new Product(product.id, product.name, product.price, product.description, product.image, product.options);
        productShop.quantity = product.quantity;
        let total = calculProductsPrice(product);
        totalPrice += total/100;
        // console.log(total);
        // console.log(productShop);
        displayProduct(productShop);
}
document.querySelectorAll('.closeBtn').forEach(btn => {
    btn.addEventListener('click', updateShopCart);
})

// Affiche le nb de produits dans le panier
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

// Met à jour le panier au clic sur le bouton supprimer
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


/*** PARTIE CALCUL PRIX TOTAL PRODUIT ET PRIX TOTAL COMMANDE ****/
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
    let totalShipping = 0;  // Méthode de calcul à définir
    let totalOrder = totalProduct + totalShipping;
    TOTAL_ORDER.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((totalOrder)) + " €";
}

/******** PARTIE RECUPERATION ET ENVOI DES DONNEES AU SERVEUR *********/

// A l'envoi du formaluraire, vérifie que le panier n'est pas vide et créer un objet commande
FORM_ORDER.addEventListener('submit', function(e) {
    e.preventDefault();
    let productsOrdered = getProductsInShop();
    if (productsOrdered.length === 0) {
        alert("Votre panier est vide");
        
    } else {
        createOrder();
    }
});

// Vérifie que les données saisies par l'utilisateur sont correctes et crée un nouvel objet "order"
function createOrder() {
    var valid = true;
    for (let input of document.querySelectorAll('#formOrder input')) {
        valid &= input.reportValidity();
        if (!valid) {
            break;
        } 
    }
    
    if(valid) {
        // contact = new Contact(document.querySelector('#inputFirstName').value, document.querySelector('#inputLastName').value, document.querySelector('#inputAddress').value, (document.querySelector('#inputCity').value + " " + document.querySelector('#inputPostCode').value), document.querySelector('#inputEmail').value);
        let contact = new Object();
        contact.firstName = document.querySelector('#inputFirstName').value;
        contact.lastName = document.querySelector('#inputLastName').value;
        contact.address = document.querySelector('#inputAddress').value
        contact.city =  document.querySelector('#inputCity').value + " " + document.querySelector('#inputPostCode').value;
        contact.email = document.querySelector('#inputEmail').value;
        let productsOrdered = getProductsInShop();
        productsOrdered.forEach(product => products.push(product.id));
        
        // document.querySelector('#inputFirstName').value = "";
        // document.querySelector('#inputLastName').value = "";
        // document.querySelector('#inputAddress').value = "";
        // document.querySelector('#inputCity').value = "";
        // document.querySelector('#inputPostCode').value = "";
        // document.querySelector('#inputEmail').value = "";
        // console.log(contact);
        // console.log(products);
        const sendTo = {
            "contact" : contact,
            "products" : products,
        };
        // console.log(sendTo);
        const promise1 = fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            body : JSON.stringify(sendTo),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        promise1.then(async(response) => {
            try {
                localStorage.clear();
                const order = await response.json();
                localStorage.setItem("contact", JSON.stringify(order));
                console.log(totalPrice);
                localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
                console.log(order.orderId);
                window.location.href = "confirmation.html";
            } catch(error) {
                console.log("Error : " + error);
            }
        });
    }
}
