//importe le module "express" qui permet d'avoir les méthodes du CRUD
const express = require("express");

// Importe le module "fs" permettant d'avoir des méthodes permettant la manipulation des fichiers
const fs = require("fs");

// Initialise une nouvelle app
const app = express();

// Importe le module 'body-parser'
const bodyParser = require("body-parser");

// Permet à l'app de pouvoir lire ce que contient "body"
app.use(bodyParser.json());

// Const qui permettent de récupérer le contenu de chaque fichier dans le dossier "routes"
const dataRoutes = require("./src/routes/dataRoutes");
const cheveuxRoutes = require("./src/routes/cheveuxRoutes");
const mainRoutes = require("./src/routes/mainRoutes");
const cadeauRoutes = require("./src/routes/cadeauRoutes");
const mangaRoutes = require("./src/routes/mangaRoutes");
const couleurRoutes = require("./src/routes/couleurRoutes");

// Ces use() permettent à l'app d'utiliser ce que contient chaque fichier 
app.use(dataRoutes);
app.use(cheveuxRoutes);
app.use(mainRoutes);
app.use(cadeauRoutes);
app.use(mangaRoutes);
app.use(couleurRoutes);

// Route pour afficher toutes les données du fichier data.json
// Ex : http://localhost:3000/data
app.get("/data", (request, response) => {
  fs.readFile("./src/model/data.json", (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    } else {
      response.status(200).json(JSON.parse(data));
    }
  });
});

// Permet d'exporter ce que contient ce fichier pour qu'il soit ensuite possiblement utilisé ailleurs
module.exports = app;
