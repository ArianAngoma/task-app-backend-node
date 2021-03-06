/* Importaciones propias */
const Task = require('../models/Task');

/* Crear nueva tarea */
const createTask = async (req, res) => {
    const {name, project} = req.body;

    try {
        const task = new Task({name, project});

        /* Guardar en DB */
        await task.save();

        res.status(201).json({
            ok: true,
            task
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

/* Obtener tareas por proyecto */
const getTasksByProject = async (req, res) => {
    const {project} = req.params;

    try {
        const tasks = await Task.find({project});
        res.status(201).json({
            ok: true,
            tasks
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

/* Actualizar tarea */
const updateTask = async (req, res) => {
    const {id} = req.params;

    const {project, ...data} = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, data, {new: true});
        res.status(201).json({
            ok: true,
            task
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
    }
}

/* Eliminar tarea por id */
const deleteTask = async (req, res) => {
    const {id} = req.params;

    try {
        const task = await Task.findByIdAndDelete(id);
        res.status(201).json({
            ok: true
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
    createTask,
    getTasksByProject,
    updateTask,
    deleteTask
}