// Handle shop cart management

// Add product in shop cart and save it in localStorage
function addProductInShop(product) {
    let productsInShop = getProductsInShop();
    let check = checkIfExistingProduct(product.id, product.options);
    // console.log(check);
    // console.log(productsInShop);
    if (!check) {
        productsInShop.push(product);
        addNbOfItems(product.quantity);
    } else {
        productsInShop = productsInShop.filter( pdt => !(pdt.id === product.id && pdt.options === pdt.options));
        console.log("produit quantité + quantité existante : " + product.quantity + "+" + check);
        addNbOfItems(product.quantity);
        product.quantity += check;
        // console.log(product.quantity);
        productsInShop.push(product);
        // let productToUpdate = productsInShop.filter(pdt => (pdt.id === product.id && pdt.options === product.options));
        // console.log(productToUpdate);
        // console.log(check);
    }
    // productsInShop.push(product);
    saveProductInShop(productsInShop);
}


// Recover products in localStorage (return empty table if there are no data)
function getProductsInShop() {
    let productsInShop = localStorage.getItem("productsInShop");
    // console.log(productsInShop);
    if (productsInShop === null) {
        return [];
    } else {
        return JSON.parse(productsInShop);
    }
}

// Remove product from shop cart and localStorage according to id and options
function removeFromShopCart(id, option) {
    let productsInShop = getProductsInShop();
    // console.log(productsInShop);
    productsInShop = productsInShop.filter(product => !(product.id === id && product.options === option));
    // console.log(productsInShop); 
    saveProductInShop(productsInShop);
}

// Save a product list in localStorage
function saveProductInShop(productList) {
    localStorage.setItem("productsInShop", JSON.stringify(productList));
}

// Recover order infos from localStorage
function getOrderContact() {
    let contact = localStorage.getItem("contact");
    // console.log(contact);
    if (contact != null) {
        return JSON.parse(contact);
    }
}

// Recover order amount from localStorage
function getOrderPrice() {
    let totalPrice = localStorage.getItem("totalPrice");
    // console.log(totalPrice);
    if (totalPrice != null) {
        return JSON.parse(totalPrice);
    }
}

// Recover products' id order from localStorage
function getOrderProducts() {
    let contact = localStorage.getItem("contact");
    if (contact != null) {
        return JSON.parse(contact);
    }
}

/***** GERE AFFICHAGE NB DE PRODUITS DANS LE PANIER******/

const SHOP_CONTAINER = document.querySelector('.itemsInShop');
let nbItems = nbOfItems();

displayNbOfItems(nbItems);

// Add quantity of added product
function addNbOfItems(quantity) {
    console.log(quantity);
    console.log(nbItems);
    console.log("quantity input : " + quantity);
    console.log("nbItams + quantity input : " + nbItems + "+" + quantity);
    nbItems += quantity;
    SHOP_CONTAINER.textContent = nbItems;
    displayNbOfItems(nbItems);
}

// Remove quantity of deleted product 
function removeNbOfItems(quantity) {
    nbItems -= quantity;
    SHOP_CONTAINER.textContent = nbItems;
    if (nbItems === 0) {
        SHOP_CONTAINER.classList.add("visibility");
    } else {
        displayNbOfItems(nbItems);
    }
}

// Calcul number of products in shop cart
function nbOfItems() {
    let productList = getProductsInShop();
    if (productList) {
        let nbOfItems = 0;
        let sum = 0;
        nbOfItems = productList.map (product => {
            return product.quantity;
        });
        for (nb of nbOfItems) {
            sum += nb;
            console.log(sum);
        }
        return sum;
    }
}

// Check if there are items in shop cart and display them in shop cart logo
function displayNbOfItems(nb) {
    if (nb) {
        SHOP_CONTAINER.setAttribute("class", "itemsInShop");
        SHOP_CONTAINER.textContent = nb;
    }
}

function checkIfExistingProduct(id, options) {
    let productsInShop = getProductsInShop();
    for (productInShop of productsInShop) {
        if (productInShop.id != id) {
            return false;
        } else if (productInShop.id === id && productInShop.options.localeCompare(options) != 0) {
            return false;
        } else {
            return productInShop.quantity;
        }
    }
}

