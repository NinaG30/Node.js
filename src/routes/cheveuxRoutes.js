// Importe le module "express"
const express = require("express");

//Créé le router
const router = express.Router();

//Importe ce que contient cheveuxController 
const cheveuxController = require("../controller/cheveuxController");

// C'est une route qui récupère une donnée via son ID dans le tableau "cheveux" du fichier data.json
// Ex: http://localhost:3000/cheveux/1
router.get("/cheveux/:id", cheveuxController.getDataById);

// C'est une route qui récupère une donnée via son nom dans le tableau "cheveux" du fichier data.json
// Ex: http://localhost:3000/cheveux/search/blond
router.get("/cheveux/search/:name", cheveuxController.getDataByName);

// C'est une route qui ajoute une donnée dans le tableau "cheveux" du fichier data.json
// Ex: http://localhost:3000/cheveux
router.post("/cheveux", cheveuxController.postData);

// C'est une route qui modifie une donnée via son ID dans le tableau "cheveux" du fichier data.json
// Ex: http://localhost:3000/cheveux/1
router.put("/cheveux/:id", cheveuxController.updateData);

// C'est une route qui supprime une donnée via son ID dans le tableau "cheveux" du fichier data.json
// Ex: http://localhost:3000/cheveux/5
router.delete("/cheveux/:id", cheveuxController.deleteData);

// Exporte le router
module.exports = router;