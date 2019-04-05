var express = require('express');
var router = express.Router();
var faker = require('faker');
var Product = require('./../models/product.model');

var logger = function(req, res, next) {
    console.info(req.params);
    next();
};

router.get('/', function(req, res) {
    Product.find({}, function(err, products){
        res.status(200).send(products);
    });
});

router.get('/:id', function(req, res) {
    Product.findOne({_id : req.params.id}, function(err, product) {
        res.status(200).send(product);
    });
});

router.post('/', function(req, res) {
    var product = new Product(req.body);
    product.save(function(err) {
        if(err) {
            return next(err);
        } else {
            res.status(201).send(product);
        }
    });
});

router.delete('/:id', logger, function(req, res) {
    Product.deleteOne({_id : req.params.id}, function(err) {
        if(err){
            return next(err);
        }
        res.status(204).send();
    });
});

router.use(function (err, req, res, next) {
    console.log(err);

    if(req.app.get('env') !== 'development'){
        delete err.stack;
    }

    res.status(err.statusCode || 500).json(err);
})

module.exports = router;