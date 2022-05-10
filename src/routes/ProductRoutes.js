const express = require('express');
const { Router } = express;
const productRouter = Router();

const { ProductContainer } = require('../models/ProductContainer');
let productContainer = new ProductContainer();

productRouter.get('/', (req, res) => {
    let products = productContainer.getAll();

    res.json({products: products});
});

productRouter.post('/', (req, res) => {
    let product = req.body;

    if (product && product.name && product.number && product.age) {
        product = productContainer.save(product.name, product.number, product.age);
        res.json({result: 'product saved', product: product});
    } else {
        res.json({result: 'product cannot saved'});
    }
});

module.exports = productRouter;