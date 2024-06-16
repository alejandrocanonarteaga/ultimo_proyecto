const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta: POST /api/inventory
// Desc: Crear un nuevo equipo en el inventario (rol de administrador)
router.post('/', authMiddleware, inventoryController.createInventory);

// Ruta: GET /api/inventory
// Desc: Obtener todos los equipos en el inventario (rol de administrador)
router.get('/', authMiddleware, inventoryController.getInventories);

module.exports = router;
