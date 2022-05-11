const { Container } = require('./Container');

class ProductContainer extends Container {
    constructor() {
        super('./src/data/products.json');
        let products = this.getAll();
        this.id = (products.length > 0) ? products.length + 1 : 1;
    }

    save(name, description, code, thumbnail, price, stock) {
        let products = this.getAll();
        let product = {
            id:this.id, 
            timestamp: Date.now(), 
            name: name,
            description: description,
            code: code,
            thumbnail: thumbnail,
            price: price,
            stock: stock
        }
        products.push(product);
        this.saveInFile(products);
        this.id++;
    }

    getAll() {
        let products = this.getContentFile();

        return products;
    }

    getById(id) {
        let products = this.getAll();
        let product = null;

        if(products.length > 0) {
            let element = products.find(elem => elem.id == id);
            if(element) {
                product = element;
            }
        }

        return product;
    }

    updateById(product) {
        let products = this.getAll();

        let updatedProducts = products.map (i => {
            if (i.id === product.id) {
                i = product;
            }
            return i;
        })

        this.saveInFile(updatedProducts);
    }

    deleteById(id) {
        let products = this.getAll();

        let updatedProducts = products.filter(i => {
            return i.id != id;
        })

        this.saveInFile(updatedProducts);
    }


}

module.exports = { ProductContainer }