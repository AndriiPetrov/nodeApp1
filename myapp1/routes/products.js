var express = require('express');
var router = express.Router();
var faker = require('faker');
var Product = require('./../models/product.model');

var logger = function(req, res, next) {
    console.info(req.params);
    next();
};

router.get('/', function(req, res) {
    res.status(200).send([{
        id: faker.random.number(),
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        color: faker.commerce.color()
    }]);
});

router.get('/:id', function(req, res) {
    res.status(200).send({
        id: req.params.id,
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        color: faker.commerce.color()
    });
});

router.post('/', function(req, res) {
    var product = new Product(req.body);
    product.save(function(err) {
        if(err) {
            res.status(500).json(err);
        } else {
            res.status(201).send(product);
        }
    });
});

router.delete('/:id', logger, function(req, res) {
    res.status(200).send({
        id: req.params.id,
        name: faker.commerce.product(),
        price: faker.commerce.price(),
        color: faker.commerce.color(),
        status: 'inactive'
    });
});

module.exports = router;