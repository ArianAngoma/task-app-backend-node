/*
* Rutas de Usuario / Auth
* host + /api/auth
* */

const {Router} = require('express');
const {check} = require('express-validator');

/* Importaciones propias */
const {createUser, signIn} = require('../controllers/auth');
const {validateFields} = require('../middlewares/validate-fields');
const {emailExists} = require('../helpers/db-validators');

/* Configuración de Router */
const router = Router();

/* Crear nuevo usuario */
router.post('/', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('email').custom(emailExists),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
    validateFields
], createUser);

/* Iniciar sesión */
router.post('/sign-in', [
    check('email', 'El email es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validateFields
], signIn);

module.exports = router;