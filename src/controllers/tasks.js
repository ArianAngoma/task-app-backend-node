const createTask = (req, res) => {
    res.status(201).json({
        ok: true
    });
}

module.exports = {
    createTask
}