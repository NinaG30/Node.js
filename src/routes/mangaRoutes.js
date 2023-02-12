// Importe le module "express"
const express = require("express");

//Créé le router
const router = express.Router();

//Importe ce que contient mangaController 
const mangaController = require("../controller/mangaController");

// C'est une route qui récupère une donnée via son ID dans le tableau "manga" du fichier data.json
// http://localhost:3000/manga/1
router.get("/manga/:id", mangaController.getDataById);

// C'est une route qui récupère une donnée via son nom dans le tableau "manga" du fichier data.json
// http://localhost:3000/manga/search/SDK
router.get("/manga/search/:name", mangaController.getDataByName);

// C'est une route qui ajoute une donnée dans le tableau "manga" du fichier data.json
// http://localhost:3000/manga
router.post("/manga", mangaController.postData);

// C'est une route qui modifie une donnée via son ID dans le tableau "manga" du fichier data.json
// http://localhost:3000/manga/1
router.put("/manga/:id", mangaController.updateData);

// C'est une route qui supprime une donnée via son ID dans le tableau "manga" du fichier data.json
// http://localhost:3000/manga/5
router.delete("/manga/:id", mangaController.deleteData);

// Exporte le router
module.exports = router;