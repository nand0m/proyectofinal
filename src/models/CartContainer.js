const { Container } = require('./Container');

class CartContainer extends Container {
    constructor() {
        super('./src/data/carts.json');
        let carts = this.getAll();
        this.id = (carts.length > 0) ? carts.length + 1 : 1;
    }

    save() {
        let carts = this.getAll();
        let cart = {
            id:this.id, 
            timestamp: Date.now(), 
            products: []
        }

        carts.push(cart);
        this.saveInFile(carts);
        this.id++;

        return cart.id;
    }

    getAll() {
        let carts = this.getContentFile();

        return carts;
    }

    getById(id) {
        let carts = this.getAll();
        let cart = null;

        if(carts.length > 0) {
            let element = carts.find(elem => elem.id == id);
            if(element) {
                cart = element;
            }
        }

        return cart;
    }

    addProductToCart(cartId, product) {
        let carts = this.getAll();
        let cart = null;

        if(carts.length > 0) {
            let element = carts.find(elem => elem.id == cartId);
            if(element) {
                element.products.push(product);
                cart = element;
            }

            this.saveInFile(carts);
        }

        return cart;
    }

    deleteById(id) {
        let carts = this.getAll();
        let updatedCarts= carts.filter(i => {
            return i.id != id;
        })

        this.saveInFile(updatedCarts);
    }

    deleteItemById(id, id_prod) {
        let carts = this.getAll();

        let updatedCarts = carts.map(i => {
            if (i.id === id) {
                i.products = i.filter(j => {
                    return j.id != id_prod;
                })
            }
            return i;
       
        })  

        this.saveInFile(updatedCarts);
    }








    
}

module.exports = { CartContainer }