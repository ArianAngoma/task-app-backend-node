const express = require('express');

/* Importaciones propias */
const {dbConnection} = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: '/api/auth'
        }

        /* Conexión a la DB */
        this.connectDB();

        // Rutas de la app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.path.auth, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server on port ', this.port);
        });
    }
}

module.exports = Server;