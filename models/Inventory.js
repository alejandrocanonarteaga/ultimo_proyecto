const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    photoUrl: {
        type: String
    },
    color: {
        type: String
    },
    purchaseDate: {
        type: Date
    },
    price: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
    stateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inventory', InventorySchema);
