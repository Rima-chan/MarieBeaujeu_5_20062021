
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

// Prend en paramètre une liste de produit et la sauvegarde dans le panier (localStorage) au format JSON
function saveProductInShop(productList) {
    localStorage.setItem("productsInShop", JSON.stringify(productList));
}



