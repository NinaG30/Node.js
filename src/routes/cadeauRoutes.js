// Importe le module "express"
const express = require("express");

//Créé le router
const router = express.Router();

//Importe ce que contient cadeauController 
const cadeauController = require("../controller/cadeauController");

// C'est une route qui récupère une donnée via son ID dans le tableau "cadeau" du fichier data.json
// Ex: http://localhost:3000/cadeau/1
router.get("/cadeau/:id", cadeauController.getDataById);

// C'est une route qui récupère une donnée via son nom dans le tableau "cadeau" du fichier data.json
// Ex: http://localhost:3000/cadeau/search/whisky
router.get("/cadeau/search/:name", cadeauController.getDataByName);

// C'est une route qui ajoute une donnée dans le tableau "cadeau" du fichier data.json
// Ex: http://localhost:3000/cadeau
router.post("/cadeau", cadeauController.postData);

// C'est une route qui modifie une donnée via son ID dans le tableau "cadeau" du fichier data.json
// Ex: http://localhost:3000/cadeau/1
router.put("/cadeau/:id", cadeauController.updateData);

// C'est une route qui supprime une donnée via son ID dans le tableau "cadeau" du fichier data.json
// Ex: http://localhost:3000/cadeau/5
router.delete("/cadeau/:id", cadeauController.deleteData);

// Exporte le router
module.exports = router;