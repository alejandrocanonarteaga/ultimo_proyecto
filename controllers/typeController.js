const Type = require('../models/Type');

const typeController = {
    // Obtener todos los tipos de equipo
    getTypes: async (req, res) => {
        try {
            const types = await Type.find();
            res.json(types);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    // Crear un nuevo tipo de equipo
    createType: async (req, res) => {
        const { name, status } = req.body;

        try {
            // Verificar si el tipo de equipo ya existe
            let existingType = await Type.findOne({ name });
            if (existingType) {
                return res.status(400).json({ msg: 'El tipo de equipo ya existe' });
            }

            // Crear nuevo tipo de equipo
            const newType = new Type({
                name,
                status
            });

            // Guardar el nuevo tipo de equipo en la base de datos
            await newType.save();
            res.json(newType);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    // Actualizar un tipo de equipo existente
    updateType: async (req, res) => {
        const { name, status } = req.body;

        // Construir objeto del tipo de equipo
        const typeFields = {};
        if (name) typeFields.name = name;
        if (status) typeFields.status = status;

        try {
            let type = await Type.findById(req.params.id);

            if (!type) {
                return res.status(404).json({ msg: 'Tipo de equipo no encontrado' });
            }

            // Actualizar el tipo de equipo
            type = await Type.findByIdAndUpdate(
                req.params.id,
                { $set: typeFields },
                { new: true }
            );

            res.json(type);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    // Eliminar un tipo de equipo existente
    deleteType: async (req, res) => {
        try {
            let type = await Type.findById(req.params.id);

            if (!type) {
                return res.status(404).json({ msg: 'Tipo de equipo no encontrado' });
            }

            // Eliminar el tipo de equipo de la base de datos
            await Type.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Tipo de equipo eliminado' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    }
};

module.exports = typeController;
