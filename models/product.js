class Product {
    constructor(id, ownerId, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.ownerId = ownerId;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price
    }
}

export default Product;