// Importe le module "express"
const express = require("express");

//Créé le router
const router = express.Router();

//Importe ce que contient mainController 
const mainController = require("../controller/mainController");

// C'est une route qui récupère une donnée via son ID dans le tableau "main" du fichier data.json
// http://localhost:3000/main/1
router.get("/main/:id", mainController.getDataById);

// C'est une route qui récupère une donnée via son nom dans le tableau "main" du fichier data.json
// http://localhost:3000/main/search/ongle
router.get("/main/search/:name", mainController.getDataByName);

// C'est une route qui ajoute une donnée dans le tableau "main" du fichier data.json
// http://localhost:3000/main
router.post("/main", mainController.postData);

// C'est une route qui modifie une donnée via son ID dans le tableau "main" du fichier data.json
// http://localhost:3000/main/1
router.put("/main/:id", mainController.updateData);

// C'est une route qui supprime une donnée via son ID dans le tableau "main" du fichier data.json
// http://localhost:3000/main/5
router.delete("/main/:id", mainController.deleteData);

// Exporte le router
module.exports = router;