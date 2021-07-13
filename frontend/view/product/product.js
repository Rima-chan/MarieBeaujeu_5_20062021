const CONTAINER = document.querySelector('#productContainer');
const PARAMS = new URLSearchParams(window.location.search);
const ID = PARAMS.get("id");
let product = {};

// Asynchrone function that recovers products infos by ID request 
(async () => {
    try {
        const config = await loadConfig();
        const response = await fetch(`${apiUrl}` + config.apiCategories.cameras + `/${ID}`);
        const data = await response.json();
        product = new Product(data._id, data.name, data.price, data.description, data.imageUrl, data.lenses);
        displaySingleProduct(product);
        displayOptions(product);
        addToShopCart();
        updateProductPrice();
    } catch(error) {
        console.log("Error : " + error);
    }
    
})()

// Create an HTML template and display it
function displaySingleProduct(product) {
    const TEMPLATE = `<div class="col-12 col-md-6 bg-image hover-zoom">
                        <img src="${product.image}" class="img-fluid w-100" alt="Photographie du produit ${product.name}">
                      </div>
                    <div class="col-12 col-md-6" id="cardProduct">
                        <h1 class="h2 mt-3 mt-md-0">Caméra vintage ${product.name}</h1>
                        <p>${product.description}</p>
                        <form>
                            <div class="form-group d-flex flex-column">
                                <div class="row"> 
                                    <div class="col-xl-12 col-md-6"> 
                                        <label for="optionSelect">Lentilles : </label>
                                        <select name="select" class="form-control form-select w-auto my-2 my-md-2 " id="optionSelect" aria-label="Selection des options de lentilles" required>
                                            <option value="">-- Options --</option>
                                        </select>
                                    </div>
                                    <div class="col-xl-12 col-md-6"> 
                                        <label for="quantitySelect">Quantité : </label>
                                        <select name="select" class="form-control form-select w-auto mb-3 mt-2 my-md-2 " id="quantitySelect" aria-label="Selection de la quantité" required>
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
                                    </div>
                                </div>
                                <p class="mt-3 mt-lg-3 mt-md-2">Prix : <span class="price">${product.getFormatedPrice()}</span> €</p>
                                <button type="submit" class="btn btn-dark rounded-pill border-0 bg-color mx-auto mt-3 mt-md-1 px-3 py-2" id="shopBtn" data-id="${product.id}" aria-label="ajouter au panier">Ajouter au panier</button>
                            </div>
                            
                        </form>
                        
                    </div>`;
    CONTAINER.insertAdjacentHTML('afterbegin', TEMPLATE);
}

// Displays specific product's options 
function displayOptions(product) {
    let optionsList = product.options;
    for (option of optionsList) {
        let newOption = new Option(option, option);
        document.querySelector('#optionSelect').appendChild(newOption);
    }
}

// Listen clic on shop button
// Add the product in shop cart
// Update nb of items in shop cart logo
function addToShopCart() {
    const FORM = document.querySelector('form');
    FORM.addEventListener('submit', (e) => {
        e.preventDefault();
        const SELECT_OPTION = document.querySelector('#optionSelect');
        const OPTION_INPUT = SELECT_OPTION.options[SELECT_OPTION.selectedIndex].value;
        const SELECT_QUANTITY = document.querySelector('#quantitySelect');
        const QUANTITY_INPUT = SELECT_QUANTITY.options[SELECT_QUANTITY.selectedIndex].value;
        product.options = OPTION_INPUT;
        product.quantity = parseInt(QUANTITY_INPUT, 10);
        addProductInShop(product);
        if (product.quantity === 1) {
            alert("Votre produit a bien été ajouté au panier !")
        } else {
            alert("Vos produits ont bien été ajoutés au panier !");
        }
    });
}

// Create a confirmation message after adding produtcs in shop cart
function confirmationMessage() {
    const MESSAGE = '<p class="mt-3">Votre produit a bien été ajouté au panier !</p>';
    document.querySelector('#cardProduct').insertAdjacentHTML('beforeend', MESSAGE);
}

// Update product's price according to selected quantity
function updateProductPrice() {
    const selectQuantity = document.querySelector('#quantitySelect');
    selectQuantity.addEventListener('change', () => {
    const quantity = selectQuantity.value;
    const priceContainer = document.querySelector('.price');
    const total = product.price/100 * quantity;
    priceContainer.textContent = new Intl.NumberFormat('fr-FR', {maximumFractionDigits : 2}).format((total));
});
}