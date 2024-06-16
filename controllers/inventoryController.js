const Inventory = require('../models/Inventory');

const inventoryController = {
    getInventories: async (req, res) => {
        try {
            const inventory = await Inventory.find();
            res.json(inventory);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    createInventory: async (req, res) => {
        const { serial, model, description, photoUrl, color, purchaseDate, price, userId, brandId, stateId, typeId } = req.body;

        try {
            let inventoryItem = new Inventory({
                serial,
                model,
                description,
                photoUrl,
                color,
                purchaseDate,
                price,
                userId,
                brandId,
                stateId,
                typeId
            });

            await inventoryItem.save();
            res.json(inventoryItem);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    }
};

module.exports = inventoryController;
