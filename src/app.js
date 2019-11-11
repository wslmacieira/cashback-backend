const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(
  "mongodb+srv://boticario:boticario@omnistack9-b4ne1.mongodb.net/boticario?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

}

module.exports = new App().server;