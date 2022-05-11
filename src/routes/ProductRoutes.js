const express = require('express');
const { Router } = express;
const productRouter = Router();

const { ProductContainer } = require('../models/ProductContainer');

let productContainer = new ProductContainer();

productRouter.get('/', (req, res) => {
    let products = productContainer.getAll();

    res.json({products: products});
});

productRouter.get('/:id', (req, res) => {
    let products = productContainer.getById(req.params.id);

    res.json({products: products});
});

productRouter.put('/:id', (req, res) => {
    let product = req.body;

    if (product && product.name && product.description && product.code && product.thumbnail && product.price && product.stock) {
        product = productContainer.updateById(req.body);
        res.json({result: 'product updated', product: product});
    } else {
        res.json({result: 'product cannot be updated'});
    }
});

productRouter.post('/', (req, res) => {
    let product = req.body;

    if (product && product.name && product.description && product.code && product.thumbnail && product.price && product.stock) {
        product = productContainer.save(product.name, product.description, product.code, product.thumbnail, product.price, product.stock);
        res.json({result: 'product saved', product: product});
    } else {
        res.json({result: 'product cannot be saved'});
    }
});


productRouter.delete('/:id', (req, res) => {
    let products = productContainer.deleteById(req.params.id);

    res.json({result: 'product deleted'});
});











module.exports = productRouter;