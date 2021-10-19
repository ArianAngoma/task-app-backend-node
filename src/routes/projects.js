/*
* Rutas de Proyectos / project
* host + /api/project
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {createProject} = require('../controllers/projects');

/* Configuración de Router */
const router = Router();

/* Crear nuevo proyecto */
router.post('/', [], createProject);

module.exports = router;
