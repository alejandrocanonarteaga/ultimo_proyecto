const State = require('../models/State');

const stateController = {
    getStates: async (req, res) => {
        try {
            const states = await State.find();
            res.json(states);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    createState: async (req, res) => {
        const { name, status } = req.body;

        try {
            let state = new State({
                name,
                status
            });

            await state.save();
            res.json(state);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    updateState: async (req, res) => {
        const { name, status } = req.body;

        // Build state object
        const stateFields = {};
        if (name) stateFields.name = name;
        if (status) stateFields.status = status;

        try {
            let state = await State.findById(req.params.id);

            if (!state) {
                return res.status(404).json({ msg: 'Estado no encontrado' });
            }

            state = await State.findByIdAndUpdate(
                req.params.id,
                { $set: stateFields },
                { new: true }
            );

            res.json(state);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    deleteState: async (req, res) => {
        try {
            let state = await State.findById(req.params.id);

            if (!state) {
                return res.status(404).json({ msg: 'Estado no encontrado' });
            }

            await State.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Estado eliminado' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    }
};

module.exports = stateController;
