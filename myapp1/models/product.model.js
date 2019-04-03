var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    price: Number,
    color: {
        type: String,
        enum: ['White', 'Black', 'Red']
    },
    last_updated: Date
}, {
    collection: 'products1'
});

module.exports = mongoose.model('Product', productSchema); //mongoDB products