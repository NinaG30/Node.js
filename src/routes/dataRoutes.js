// Importe le module "express"
const express = require("express");

//Créé le router
const router = express.Router();

//Importe ce que contient dataController 
const dataController = require("../controller/dataController");

// C'est une route qui récupère une donnée via son ID dans le tableau "data" du fichier data.json
// http://localhost:3000/data/1
router.get("/data/:id", dataController.getDataById);

// C'est une route qui récupère une donnée via son nom dans le tableau "data" du fichier data.json
// http://localhost:3000/data/search/a
router.get("/data/search/:name", dataController.getDataByName);

// C'est une route qui ajoute une donnée dans le tableau "data" du fichier data.json
// http://localhost:3000/data
router.post("/data", dataController.postData);

// C'est une route qui modifie une donnée via son ID dans le tableau "data" du fichier data.json
// http://localhost:3000/data/1
router.put("/data/:id", dataController.updateData);

// C'est une route qui supprime une donnée via son ID dans le tableau "data" du fichier data.json
// http://localhost:3000/data/5
router.delete("/data/:id", dataController.deleteData);

// Exporte le router
module.exports = router;