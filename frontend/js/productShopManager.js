// Gestion des produits aujoutés ou supprimés du panier avec localStorage

// Ajoute le produit au panier
function addProductInShop(product) {
    let productsInShop = getProductsInShop();
    console.log(productsInShop);
    // if (productsInShop.length != 0) {
    //     productsInShop.map(pdt => {

    //     })        


    //     // for (productInShop of productsInShop) {
    //     //     if (productInShop.id === product.id && Object.is(productInShop.options,product.options)) {
    //     //         // productInShop.options.localeCompare(product.option);
    //     //         // console.log(productInShop.options.localeCompare(product.option));
    //     //         productInShop.quantity += product.quantity;
    //     //         // console.log(productInShop.options);
    //     //         // console.log(product.options);
    //     //         // console.log(productInShop.options === product.option);
    //     //         console.log(Object.is(productInShop.options,product.options));
    //     //     } else if (productInShop.id === product.id && !Object.is(productInShop.options,product.options)){
    //     //         productInShop.quantity = product.quantity;
    //     //         productsInShop.push(product);
    //     //     } else {
    //     //         productsInShop.push(product);

    //     //     }
    //     // }
    // } else {
    //     productsInShop.push(product);
    // }
    productsInShop.push(product);
    saveProductInShop(productsInShop);
    
}

// Si le panier est vide, retourne un tableau vide 
// Sinon retourne la liste des produits au format JS (pour pouvoir y ajouter un nouveau produit)
function getProductsInShop() {
    let productsInShop = localStorage.getItem("productsInShop");
    // console.log(productsInShop);
    if (productsInShop === null) {
        return [];
    } else {
        return JSON.parse(productsInShop);
    }
}

// Permet de ne pas supprimer 2 produits en même temsp (même ref mais pas même option)
function removeFromShopCart(id, option) {
    let productsInShop = getProductsInShop();
    // console.log(productsInShop);
    // Fontion fléchée callback de la méthode filter => en gros retourne les produits qui n'ont ni l'Id , ni la même option 
    // Peut-être à faire dans l'autre sens ? Avec un OU mais je comprends mieux la logique du &&
    productsInShop = productsInShop.filter(product => !(product.id === id && product.options === option));
    // console.log(productsInShop); 
    saveProductInShop(productsInShop);
}

// Prend en paramètre une liste de produit et la sauvegarde dans le panier (localStorage) au format JSON
function saveProductInShop(productList) {
    localStorage.setItem("productsInShop", JSON.stringify(productList));
}

function getOrderContact() {
    let contact = localStorage.getItem("contact");
    // console.log(contact);
    if (contact != null) {
        return JSON.parse(contact);
    }
}

function getOrderPrice() {
    let totalPrice = localStorage.getItem("totalPrice");
    // console.log(totalPrice);
    if (totalPrice != null) {
        return JSON.parse(totalPrice);
    }
}

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

// Ajoute la quantité au panier
function addNbOfItems(quantity) {
    nbItems += quantity;
    SHOP_CONTAINER.textContent = nbItems;
    displayNbOfItems(nbItems)
}

// Supprime la quantité du panier
function removeNbOfItems(quantity) {
    nbItems -= quantity;
    SHOP_CONTAINER.textContent = nbItems;
    if (nbItems === 0) {
        SHOP_CONTAINER.classList.add("visibility");
    } else {
        displayNbOfItems(nbItems);
    }
}

// Vérifie que le panier n'est pas vide et récupère le nombre de produits dans le panier
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

// Affiche le nombre de produits dans le panier s'il est positif
function displayNbOfItems(nb) {
    if (nb) {
        SHOP_CONTAINER.setAttribute("class", "itemsInShop");
        SHOP_CONTAINER.textContent = nb;
    }
}


