// Charge/import le module "express" pour accéder aux méthodes d'express
const express = require("express");
//Charge le module "fs" pour créer et gérer des fichiers 
//pour y stocker ou lire des fichiers dans le programme Node
//require inclut le fs à notre projet
const fs = require("fs");
// Créér une instance d'express
const app = express();

//Cette fonction gère les demandes GET adressées au chemin "/data"
app.get("/data", (request, response) => {
  //lit le fichier data.json
  fs.readFile("data.json", (err, data) => {
    if (err) { //s'il y a une erreur alors il répondra : 
      response.status(500).json({ 
        //Status 500 est le code erreur dans Express
        message: "erreur",
        error: err,
      });
    } else { //sinon si tout va bien, il répondra :
        //Status 200 est le code pour dire 'tout va bien' dans Express
      response.status(200).json(JSON.parse(data)); //JSON.parse permet d'avoir un objet JS (json) 
      //de l'argument data qui est un string
    }
  });
});

//Expose le port 3000 
//La fonction se lie avec l'host et le port spécifié
app.listen(3000, () => {
  console.log("L'application tourne sur le port 3000");
});

