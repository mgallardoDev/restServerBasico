const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/configDB");
const {
  AuthRoutes,
  CategoriesRoutes,
  ProductsRoutes,
  SearchRoutes,
  UsersRoutes,
} = require("../routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      users: "/api/usuarios",
    };

    //Conect DB
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicacion
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //Lectura y parseo del body
    this.app.use(express.json());
    //Directorio público
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, AuthRoutes )
    this.app.use(this.paths.categories, CategoriesRoutes )
    this.app.use(this.paths.products, ProductsRoutes )
    this.app.use(this.paths.search, SearchRoutes )
    this.app.use(this.paths.users, UsersRoutes )
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", process.env.PORT);
    });
  }

  async conectarDB() {
    await dbConection();
  }
}

module.exports = Server;
