
// Gestion des produits aujoutés ou supprimés du panier avec localSorage

// Ajoute le produit au panier
function addProductInShop(product) {
    let productsInShop = getProductsInShop();
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

