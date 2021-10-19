/*
* Rutas de Proyectos / project
* host + /api/project
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {createProject} = require('../controllers/projects');
const {validateFields} = require('../middlewares/validate-fields');
const {validateJwt} = require('../middlewares/validate-jwt');

/* Configuración de Router */
const router = Router();

/* Validación de proyectos para todas las rutas de Proyectos */
router.use(validateJwt);

/* Crear nuevo proyecto */
router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    validateFields
], createProject);

module.exports = router;
