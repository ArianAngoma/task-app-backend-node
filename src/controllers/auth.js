const bcrypt = require('bcryptjs');

/* Importaciones propias */
const User = require('../models/User');
const {generateJWT} = require('../helpers/jwt');

const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});

        /* Encriptar password */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        /* Guardar en DB */
        await user.save();

        /* Generar JWT */
        const token = await generateJWT(user.id);

        res.status(201).json({
            ok: true,
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

const signIn = async (req, res) => {
    const {email, password} = req.body;

    try {
        /* Verificar si el email existe */
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({
            ok: false,
            msg: `No existe usuario con el email ${email}`
        });

        /* Verificar la contraseña */
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return res.status(400).json({
            ok: false,
            msg: 'Password incorrecto'
        });

        /* Generar JWT */
        const token = await generateJWT(user.id);

        res.status(201).json({
            ok: true,
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

module.exports = {
    createUser,
    signIn
}