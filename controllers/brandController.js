const Brand = require('../models/Brand');

const brandController = {
    getBrands: async (req, res) => {
        try {
            const brands = await Brand.find();
            res.json(brands);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    createBrand: async (req, res) => {
        const { name, status } = req.body;

        try {
            let brand = new Brand({
                name,
                status
            });

            await brand.save();
            res.json(brand);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    updateBrand: async (req, res) => {
        const { name, status } = req.body;

        // Build brand object
        const brandFields = {};
        if (name) brandFields.name = name;
        if (status) brandFields.status = status;

        try {
            let brand = await Brand.findById(req.params.id);

            if (!brand) {
                return res.status(404).json({ msg: 'Marca no encontrada' });
            }

            brand = await Brand.findByIdAndUpdate(
                req.params.id,
                { $set: brandFields },
                { new: true }
            );

            res.json(brand);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    deleteBrand: async (req, res) => {
        try {
            let brand = await Brand.findById(req.params.id);

            if (!brand) {
                return res.status(404).json({ msg: 'Marca no encontrada' });
            }

            await Brand.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Marca eliminada' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    }
};

module.exports = brandController;
