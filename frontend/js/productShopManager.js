// Handle shop cart management

// Add product in shop cart and save it in localStorage
function addProductInShop(product) {
    let productsInShop = getProductsInShop();
    productsInShop.push(product);
    addNbOfItems(product.quantity);
    saveProductInShop(productsInShop);
}

// Recover products in localStorage (return empty table if there are no data)
function getProductsInShop() {
    let productsInShop = localStorage.getItem("productsInShop");
    if (productsInShop === null) {
        return [];
    } else {
        return JSON.parse(productsInShop);
    }
}

// Remove product from shop cart and localStorage according to id and options
function removeFromShopCart(id, option) {
    let productsInShop = getProductsInShop();
    productsInShop = productsInShop.filter(product => !(product.id === id && product.options === option));
    saveProductInShop(productsInShop);
}

// Save a product list in localStorage
function saveProductInShop(productList) {
    localStorage.setItem("productsInShop", JSON.stringify(productList));
}

// Recover order infos from localStorage
function getOrderContact() {
    let contact = localStorage.getItem("contact");
    if (contact != null) {
        return JSON.parse(contact);
    }
}

// Recover order amount from localStorage
function getOrderPrice() {
    let totalPrice = localStorage.getItem("totalPrice");
    if (totalPrice != null) {
        return JSON.parse(totalPrice);
    }
}

/***** HANDLE NB OF ITEMS DISPLAYED IN SHOP CART ******/

const SHOP_CONTAINER = document.querySelector('.itemsInShop');
let nbItems = nbOfItems();

displayNbOfItems(nbItems);

// Add quantity of added products
function addNbOfItems(quantity) {
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