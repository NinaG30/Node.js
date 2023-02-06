// Charge le module "express"
const express = require("express");
// Charge le module "fs"
const fs = require("fs");
// Create a new instance of express
const app = express();

//Cette fonction gère les demandes GET adressées au chemin "/data"
app.get("/data", (request, response) => {
  fs.readFile("data.json", (err, data) => {
    if (err) { //s'il y a une erreur alors il répondra : 
      response.status(500).json({ 
        //Status 500 est le code erreur dans Express
        message: "erreur",
        error: err,
      });
    } else { //sinon si tout va bien, il répondra :
        //Status 200 est le code pour dire 'tout va bien' dans Express
      response.status(200).json(JSON.parse(data)); //JSON.parse permet d'avoir a JavaScript object.
    }
  });
});

//"ecoute" le port 3000 
//The app.listen() method binds itself with the specified host and port to bind and listen for any connections.
app.listen(3000, () => {
  console.log("L'application tourne sur le port 3000");
});

