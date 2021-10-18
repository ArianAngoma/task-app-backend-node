const express = require('express');
const cors = require('cors');

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

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        /* CORS */
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('src/public'));
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