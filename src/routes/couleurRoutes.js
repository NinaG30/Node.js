// Importe le module "express"
const express = require("express");

//Créé le router
const router = express.Router();

//Importe ce que contient couleurController 
const couleurController = require("../controller/couleurController");

// C'est une route qui récupère une donnée via son ID dans le tableau "couleur" du fichier data.json
// http://localhost:3000/couleur/1
router.get("/couleur/:id", couleurController.getDataById);

// C'est une route qui récupère une donnée via son nom dans le tableau "couleur" du fichier data.json
// http://localhost:3000/couleur/search/rouge
router.get("/couleur/search/:name", couleurController.getDataByName);

// C'est une route qui ajoute une donnée dans le tableau "couleur" du fichier data.json
// http://localhost:3000/couleur
router.post("/couleur", couleurController.postData);

// C'est une route qui modifie une donnée via son ID dans le tableau "couleur" du fichier data.json
// http://localhost:3000/couleur/1
router.put("/couleur/:id", couleurController.updateData);

// C'est une route qui supprime une donnée via son ID dans le tableau "couleur" du fichier data.json
// http://localhost:3000/couleur/5
router.delete("/couleur/:id", couleurController.deleteData);

// Exporte le router
module.exports = router;