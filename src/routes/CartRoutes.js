const express = require('express');
const { Router } = express;
const cartRouter = Router();

const { CartContainer } = require('../models/CartContainer');
const { ProductContainer } = require('../models/ProductContainer');

let cartContainer = new CartContainer();
let productContainer = new ProductContainer();

cartRouter.get('/', (req, res) => {
    let carts = cartContainer.getAll();

    res.json({carts: carts});
});


cartRouter.get('/:id/products', (req, res) => {
    let cart = cartContainer.getById(req.params.id);

    res.json({cart: cart.id, products: cart.products});
});




cartRouter.post('/', (req, res) => {
    let cart = [];

    cart = cartContainer.save();

    res.json({result: 'cart saved', cart: cart.id});

});

cartRouter.post('/:id/products', (req, res) => {
    let cartId = req.params.id;
    let product = productContainer.getById(req.body.id);

    if (cartId && product) {
        let cart = cartContainer.addProductToCart(cartId, product);
        
        res.json({result: 'product added to cart', cart: cart});
    } else {
        res.json({result: 'product cannot be added'});
    }
});

cartRouter.delete('/:id', (req, res) => {
    let carts = cartContainer.deleteById(req.params.id);

    res.json({result: 'cart deleted'});
});

cartRouter.delete('/:id/products/:id_prod', (req, res) => {
    let carts = cartContainer.deleteItemById(req.params.id, req.params.id_prod);

    res.json({cart: req.params.id, product: req.params.id_prod, result: 'item deleted'});
});





module.exports = cartRouter;