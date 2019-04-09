var express = require('express');
var router = express.Router();
var faker = require('faker');
var passport = require('passport');

var Product = require('./../models/product.model');

var logger = function(req, res, next) {
    console.info(req.params);
    next();
};

router.use(passport.authenticate('jwt', {session: false}));

// var profiler = require('./../profiler');
//
// var tracker = function(req, res, next) {
//     var start = process.htrime();
//     req.on('end', function() {
//         console.info(process.hrtime(statt)[1]/1000000);
//     });
//     next();
// };
//
// var profiledGet = profiler.profile(function (req, res) {
//     Product.find({}, function(err, products) {
//         if(err) {
//             return next(err);
//         }
//         res.status(200).send(products);
//     });
// }, 'products get request');

router.get('/', function(req, res, next) {
    Product.find({}, function(err, products){
        if(err) {
            return next(err);
        }
        res.status(200).send(products);
    });
});

router.get('/:id', function(req, res, next) {
    Product.findOne({_id : req.params.id}, function(err, product) {
        if(err) {
            return next(err);
        }
        res.status(200).send(product);
    });
});

router.post('/', function(req, res, next) {
    var product = new Product(req.body);
    product.save(function(err) {
        if(err) {
            return next(err);
        } 
        res.status(201).send(product);
    });
});

router.delete('/:id', logger, function(req, res, next) {
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