/* Importaciones propias */
const User = require('../models/User');

const createUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = new User({name, email, password});
        /* Guardar en DB */
        await user.save();

        res.status(201).json({
            ok: true,
            user
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
    createUser
}