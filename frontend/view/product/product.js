/*
* Récupère l'id enregistré dans l'url
* Faire une requête fetch de l'id
* Afficher les infos produits sur la page
* Fonction enregistrement de l'option
* Fonction enregistrement panier 
* Fonction affichage nb panier
* Fonction si panier alors changer bouton en supprimer du panier ?
*/


// SELECTEURS 
const CONTAINER = document.querySelector('#productContainer');



// VARIABLES & CONSTANTES
const URL_ID = window.location.search;
const ID = URL_ID.slice(4,URL_ID.length);
// console.log(ID);
const URL = `http://localhost:3000/api/cameras/${ID}`;
let product = {};


// ECOUTEURS



// FONCTIONS

fetch(URL)
.then(response => response.json())
.then(data => {
    let product = createProduct(data);
    displaySingleProduct(product);
    displayOptions(product);
    addToShopCart();
    // console.log(data);
    // console.log(product);

})
.catch(error => console.log("Error : " + error))

// Crée un objet "produit" 
function createProduct(element) {
    let newProduct = new Product(element._id, element.name, element.price, element.description, element.imageUrl, element.lenses);
    product[newProduct.id] = newProduct;
    return newProduct;
}

// Affiche le produit sur la page HTML
function displaySingleProduct(product) {
    const TEMPLATE = `<div class="col-12 col-md-6">
                        <img src="${product.image}" class="img-fluid">
                      </div>
                    <div class="col-12 col-md-6" id="cardProduct">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <form>
                            <div class="form-group">
                                <label for="optionSelect">Choissisez une taille de lentille : </label>
                                <select name="select" class="form-control form-select w-50" id="optionSelect" aria-label="Selection des options" required>
                                    <option value="">-- Options --</option>
                                </select>
                                <p class="mt-3">${product.getFormatedPrice()} €</p>
                                <button type="submit" class="btn btn-dark rounded-pill border-0 bg-color px-3 py-2" id="shopBtn" data-id="${product.id}">Ajouter au panier</button>
                            
                            </div>
                        </form>
                    </div>`;
    CONTAINER.insertAdjacentHTML('afterbegin', TEMPLATE);
}

// Récupère les 
function displayOptions(product) {
    let optionsList = product.options;
    // console.log(optionsList);
    for (option of optionsList) {
        let newOption = new Option(option, option);
        document.querySelector('#optionSelect').appendChild(newOption);
        // console.log(newOption);
    }
}

function addToShopCart() {
    const FORM = document.querySelector('form');
    // const BUTTON = document.querySelector('#shopBtn');
    FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        const ID = e.target.querySelector('#shopBtn').dataset.id;
        const SELECT = document.querySelector('#optionSelect');
        const OPTION_INPUT = SELECT.options[SELECT.selectedIndex].value;
        // console.log(ID);
        // console.log(OPTION_INPUT);
        product[ID].options = OPTION_INPUT;
        addProductInShop(product);
        // alert("Votre produit a bien été ajouté au panier !");
    });
}

function confirmationMessage() {
    const MESSAGE = '<p class="mt-3">Votre produit a bien été ajouté au panier !</p>';
    document.querySelector('#cardProduct').insertAdjacentHTML('beforeend', MESSAGE);
}

// LOCAL STORAGE
// function saveToLocalStorage(product) {
//     let data = localStorage.getItem("productsInShop");
//     let productInShopCart = [];
//     if (data === null) {
//         productInShopCart = [];
//     } else {
//         productInShopCart.push(localStorage.getItem("productsInShop"));
//     } 
//     productInShopCart.push(JSON.stringify(product));
//     console.log(productInShopCart);
//     localStorage.setItem("productsInShop", productInShopCart);
// }