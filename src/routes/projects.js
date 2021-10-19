/*
* Rutas de Proyectos / project
* host + /api/project
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {createProject, getProjectsByUser, updateProject, deleteProject} = require('../controllers/projects');
const {validateFields} = require('../middlewares/validate-fields');
const {validateJwt} = require('../middlewares/validate-jwt');
const {projectExistByIdAndUserIsToken} = require('../helpers/db-validators');

/* Configuración de Router */
const router = Router();

/* Validación de proyectos para todas las rutas de Proyectos */
router.use(validateJwt);

/* Crear nuevo proyecto */
router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    validateFields
], createProject);

/* Obtener todos los proyectos por usuario */
router.get('/', getProjectsByUser);

/* Actualizar un proyecto por id */
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(projectExistByIdAndUserIsToken),
    validateFields
], updateProject);

/* Eliminar un proyecto por id */
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(projectExistByIdAndUserIsToken),
    validateFields
], deleteProject);

module.exports = router;
