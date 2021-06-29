const CONTAINER = document.querySelector('#productContainer');
const URL_ID = window.location.search;
const ID = URL_ID.slice(4,URL_ID.length);
// console.log(ID);
const URL = `http://localhost:3000/api/cameras/${ID}`;
let product = {};


fetch(URL)
.then(response => response.json())
.then(data => {
    let newProduct = createProduct(data);
    // console.log(newProduct);
    displaySingleProduct(newProduct);
    displayOptions(newProduct);
    addToShopCart();
    // console.log(data);
    // console.log(product);

})
.catch(error => console.log("Error : " + error))

// Crée un objet "produit" 
function createProduct(element) {
    product = new Product(element._id, element.name, element.price, element.description, element.imageUrl, element.lenses);
    return product;
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
                                <label for="quantitySelect">Choissisez une quantité : </label>
                                <select name="select" class="form-control form-select w-25" id="quantitySelect" aria-label="Selection de la quantité" required>
                                    <option value="1" selected>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <p class="mt-3">${product.getFormatedPrice()} €</p>
                                <button type="submit" class="btn btn-dark rounded-pill border-0 bg-color px-3 py-2" id="shopBtn" data-id="${product.id}">Ajouter au panier</button>
                            
                            </div>
                        </form>
                    </div>`;
    CONTAINER.insertAdjacentHTML('afterbegin', TEMPLATE);
}

// Affiche les options correspondantes au produit
function displayOptions(product) {
    let optionsList = product.options;
    // console.log(optionsList);
    for (option of optionsList) {
        let newOption = new Option(option, option);
        document.querySelector('#optionSelect').appendChild(newOption);
        // console.log(newOption);
    }
}

// Ajoute le produit au panier au clic sur le bouton
function addToShopCart() {
    const FORM = document.querySelector('form');
    FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        const SELECT_OPTION = document.querySelector('#optionSelect');
        const OPTION_INPUT = SELECT_OPTION.options[SELECT_OPTION.selectedIndex].value;
        const SELECT_QUANTITY = document.querySelector('#quantitySelect');
        const QUANTITY_INPUT = SELECT_QUANTITY.options[SELECT_QUANTITY.selectedIndex].value;
        // console.log(ID);
        // console.log(OPTION_INPUT);
        //console.log(product.options);
        product.options = OPTION_INPUT;
        product.quantity = parseInt(QUANTITY_INPUT, 10);
        // console.log(product.options);
        // console.log(product.quantity);
        // console.log(product);
        addProductInShop(product);
        addNbOfItems(product.quantity);
        // alert("Votre produit a bien été ajouté au panier !");
    });
}

function confirmationMessage() {
    const MESSAGE = '<p class="mt-3">Votre produit a bien été ajouté au panier !</p>';
    document.querySelector('#cardProduct').insertAdjacentHTML('beforeend', MESSAGE);
}

