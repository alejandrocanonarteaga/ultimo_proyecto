const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta: POST /api/brands
// Desc: Crear una nueva marca de equipo (rol de administrador)
router.post('/', authMiddleware, brandController.createBrand);

// Ruta: GET /api/brands
// Desc: Obtener todas las marcas de equipos (rol de administrador)
router.get('/', authMiddleware, brandController.getBrands);

module.exports = router;
