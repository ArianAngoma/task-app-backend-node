const express = require('express');

/* Importaciones propias */
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        /* Conexión a la DB */
        this.connectDB();
    }

    async connectDB() {
        await dbConnection();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port ', this.port);
        });
    }
}

module.exports = Server;