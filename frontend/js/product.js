class Product {
    constructor(id, name, price, description, image, options) {
        this.id = id,
        this.name = name, 
        this.price = price,
        this.description = description,
        this.image = image, 
        this.options =  options,
        this.quantity = 1
    }

    getFormatedPrice() {
        let price = new Intl.NumberFormat('fr-FR', {maximumFractionDigits: 2}).format((this.price / 100 * this.quantity));
        return price;
    }
}