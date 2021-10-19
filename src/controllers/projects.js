/* Importaciones propias */
const Project = require('../models/Project');

const createProject = async (req, res) => {
    const {name} = req.body;
    const {_id} = req.user;

    try {
        const project = new Project({name, creator: _id});

        /* Guardar en DB */
        await project.save();

        res.status(201).json({
            ok: true,
            project
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }

    res.status(201).json({
        ok: true
    });
}

/* Obtener todos los proyectos por usuario */
const getProjectsByUser = async (req, res) => {
    const {_id} = req.user;

    try {
        const projects = await Project.find({creator: _id}).sort({created: -1});

        res.status(201).json({
            ok: true,
            projects
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
    createProject,
    getProjectsByUser
}