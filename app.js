const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// C'est une route qui me permet de récupérer une data par son id
// GET "/data/:id"
// Ex: http://localhost:3000/:arrayName/:id //changer pour entrees plats ou desserts /l'id voulu

app.get("/:arrayName/:id", (request, response) => {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      erreur();
    } else {
      const jsonData = JSON.parse(data);
      const dataById = jsonData[request.params.arrayName].find(        
        (obj) => obj.id === parseInt(request.params.id)
      );
      if (dataById) {
        response.status(200).json(dataById);
      } else {
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      }
    }
  });
});

// C'est une route qui permet d'afficher un des tableaux de mon fichier data.json
// POST "/data"
// Ex: http://localhost:3000/:arrayName //changer pour entrees plats ou desserts
app.get("/:arrayName", (request, response) => {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      erreur();
    } else {
      const existingData = JSON.parse(data);
      response.status(200).json(existingData[request.params.arrayName]);
    }
  });
});

// C'est une route qui me permet d'insérer de la données dans mon fichier data.json
// POST "/data"
// Ex: http://localhost:3000/:arrayName
app.post("/:arrayName", (request, response) => {
  fs.readFile("data.json", (err, data) => {
    if (err) {
      erreur();
    } else {
      const existingData = JSON.parse(data);
      existingData[request.params.arrayName].push(request.body);
      fs.writeFile("data.json", JSON.stringify(existingData), (writeErr) => {
        if (writeErr) {
          response.status(500).json({
            message: "Une erreur est survenue lors de l'écriture des données",
          });
        } else {
          response.status(200).json({
            message: "Les données ont été ajouté avec succès",
          });
        }
      });
    }
  });
});

function erreur() {
  response.status(500).json({
    message: "Erreur lors de la lecture des données",
    error: err,
  });
}

module.exports = app;
