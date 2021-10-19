/*
* Rutas de Tareas / task
* host + /api/task
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {validateJwt} = require('../middlewares/validate-jwt');
const {createTask} = require('../controllers/tasks');

/* Configuración de Router */
const router = Router();

/* Validación de proyectos para todas las rutas de Proyectos */
router.use(validateJwt);

router.post('/', createTask);

module.exports = router;
