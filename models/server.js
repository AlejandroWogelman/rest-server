const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

    //Conectar a DB
    this.conectarDB();

    //middlewares (Funciones que añaden funcionalidad, se ejecutan siempre al levantar server)
    this.middlewares();

    //Ruta de la APP
    this.routes();
  }

  async conectarDB() {
    await dbConection();
  }

  //  "USE" palabra clave para saber que es un middleware
  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json()); //Cualquier cosa que venga intentará serializar a json

    //  Directorio público
    this.app.use(express.static("public")); //Reemplaza "/"
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("servidor corriendo en el puerto: ", this.port)
    );
  }
}
module.exports = Server;
