/* Importaciones propias */
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

// users => Valida si email ya esta registrado en la DB
const emailExists = async (email = '') => {
    const existsEmail = await User.findOne({email});
    if (existsEmail) throw new Error(`El correo ${email} ya esta registrado`);
}

// projects => Valida si existe un proyecto por id y si es el mismo usuario quien lo creó
const projectExistByIdAndUserIsToken = async (value, {req}) => {
    // console.log(value);
    const existsProject = await Project.findById(value);

    if (!existsProject) throw new Error(`El proyecto con ${value} no existe`);
    if (existsProject.creator.toString() !== req.user.id) throw new Error(`No autorizado`);
}

module.exports = {
    emailExists,
    projectExistByIdAndUserIsToken
}