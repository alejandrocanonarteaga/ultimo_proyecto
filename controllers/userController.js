const User = require('../models/User');

const userController = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            res.json(users);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    createUser: async (req, res) => {
        const { name, email, password, role } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'El usuario ya existe' });
            }

            user = new User({
                name,
                email,
                password,
                role
            });

            await user.save();
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    updateUser: async (req, res) => {
        const { name, email, role } = req.body;

        // Build user object
        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
        if (role) userFields.role = role;

        try {
            let user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: userFields },
                { new: true }
            );

            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    },

    deleteUser: async (req, res) => {
        try {
            let user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            await User.findByIdAndRemove(req.params.id);

            res.json({ msg: 'Usuario eliminado' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Error del servidor');
        }
    }
};

module.exports = userController;
