const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const ProductCartSchema = mongoose.Schema({
    _id: {
        type: ObjectId,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
});

const CartSchema = mongoose.Schema({
    products: {
        type: [ProductCartSchema],
        require: true
    },
    time_stamp: {
        type: Date,
        require: true
    },
});

module.exports = mongoose.model('Cart', CartSchema);