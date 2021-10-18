const createUser = (req, res) => {
    console.log(req.body);
    res.json({
        msg: 'ok'
    });
}

module.exports = {
    createUser
}