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

module.exports = {
    createTask
}