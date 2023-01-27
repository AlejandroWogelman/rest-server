const express = require("express");
const cors = require("cors");
const app = express();

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usariosPath = "/api/usuarios";

    //middlewares (Funciones que añaden funcionalidad, se ejecutan siempre al levantar server)
    this.middlewares();

    //Ruta de la APP
    this.routes();
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
    this.app.use(this.usariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log("servidor corriendo en el puerto: ", this.port)
    );
  }
}
module.exports = Server;
