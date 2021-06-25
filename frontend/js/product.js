// Création d'une classe Produit qui 
// Méthode de classe pour afficher le prix au bont format
class Product {
    constructor(id, name, price, description, image, options) {
        this.id = id,
        this.name = name, 
        this.price = price,
        this.description = description,
        this.image = image, 
        this.options =  options
    }

    getFormatedPrice() {
        let price = new Intl.NumberFormat().format((this.price / 100));
        return price;
    }
}