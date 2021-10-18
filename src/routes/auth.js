/*
* Rutas de Usuario / Auth
* host + /api/auth
* */

const {Router} = require('express');

/* Importaciones propias */
const {createUser} = require('../controllers/auth');

/* Configuración de Router */
const router = Router();

/* Crear nuevo usuario */
router.post('/', createUser);

module.exports = router;