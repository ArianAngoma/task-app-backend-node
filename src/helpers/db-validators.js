/* Importaciones propias */
const User = require('../models/User');
const Project = require('../models/Project');

// users => Valida si email ya esta registrado en la DB
const emailExists = async (email = '') => {
    const existsEmail = await User.findOne({email});
    if (existsEmail) throw new Error(`El correo ${email} ya esta registrado`);
}

// projects => Valida si existe un proyecto por id y si es el mismo usuario quien lo creó
const projectExistByIdAndUserIsToken = async (id, {req}) => {
    const existsEvent = await Project.findById(id);

    if (!existsEvent) throw new Error(`El evento con ${id} no existe`);
    if (existsEvent.creator.toString() !== req.user.id) throw new Error(`No tiene privilegio de editar/eliminar el evento con id ${id}`);
}

module.exports = {
    emailExists,
    projectExistByIdAndUserIsToken
}