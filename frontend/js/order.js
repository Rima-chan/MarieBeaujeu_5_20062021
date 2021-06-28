class Order {
    constructor(firstName, LastName, address, city, email) {
        this.firstName = firstName,
        this.LastName = LastName,
        this.address = address,
        this.city = city,
        this.email = email,
        this.productsOrdered = [];
        this.orderId = Math.random().toString(36).substr(2,9);
    }
}