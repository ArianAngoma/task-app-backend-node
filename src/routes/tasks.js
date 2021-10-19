/*
* Rutas de Tareas / task
* host + /api/task
* */

const {Router} = require('express');
const {check, body} = require('express-validator');

/* Importaciones propias */
const {createTask, getTasksByProject} = require('../controllers/tasks');
const {validateJwt} = require('../middlewares/validate-jwt');
const {validateFields} = require('../middlewares/validate-fields');
const {projectExistByIdAndUserIsToken} = require('../helpers/db-validators');

/* Configuración de Router */
const router = Router();

/* Validación de proyectos para todas las rutas de Proyectos */
router.use(validateJwt);

/* Crear nueva tarea */
router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('project', 'No es id de Mongo válido').isMongoId(),
    body('project').custom(projectExistByIdAndUserIsToken),
    validateFields
], createTask);

/* Obtener tareas por proyecto */
router.get('/', [
    check('project', 'No es id de Mongo válido').isMongoId(),
    body('project').custom(projectExistByIdAndUserIsToken),
    validateFields
], getTasksByProject);

module.exports = router;