const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Obtener el token del header de la solicitud
    const token = req.header('x-auth-token');

    // Verificar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, autorización denegada' });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extraer el usuario del token decodificado
        req.user = decoded.user;

        // Verificar si el usuario existe en la base de datos
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(401).json({ msg: 'Token no válido' });
        }

        // Continuar con la solicitud
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ msg: 'Token no válido' });
    }
};

module.exports = authMiddleware;


module.exports = authMiddleware;
