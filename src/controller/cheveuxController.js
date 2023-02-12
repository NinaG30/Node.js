const fs = require("fs");

// Permet d'exporter la fonction qui permet de récupérer via l'id 
// une donnée du tableau 'cheveux' présent dans data.json
exports.getDataById = (request, response) => {
  // Lit data.json
  fs.readFile("./src/model/data.json", (err, data) => {
    //si erreur
    if (err) {
      // Renvoie 500 + message + erreur
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    //sinon
    } else {
      //Transforme en json le fichier data.json
      const jsonData = JSON.parse(data);
      //Cherche l'id dans le tableau
      const dataById = jsonData.cheveux.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      //Si trouve l'id
      if (dataById) {
        // renvoie statut 200 + les données
        response.status(200).json(dataById);
      //sinon
      } else {   
        // renvoie statut 404 + message   
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      }
    }
  });
};

// Exporte la fonction qui permet de récupérer une donnée via son nom du tableau 'cheveux' dans data.json
exports.getDataByName = (request, response) => {
  // Lit data.json
  fs.readFile("./src/model/data.json", (err, data) => {
    //Si erreur
    if (err) {
      // Renvoie 500 + message + erreur
      response.statut(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    //sinon
    } else {
      //Transforme en json le fichier data.json
      const jsonData = JSON.parse(data);
      //Cherche le nom dans le tableau
      const dataByName = jsonData.cheveux.find(
        (obj) => obj.name == request.params.name
        
      ); 
      //Si trouve le nom     
      if (dataByName) {
         // renvoie statut 200 + message
        response.status(200).json(dataByName);
      //sinon
      } else {
         // renvoie statut 404 + message
        response.status(404).json({
          message: "Aucun truc à ce nom",
        });
      }
    }
  });
};

//Exporte une fonction qui permet d'ajouter une donnée au tableau 'cheveux' dans data.json avec id dynamique
exports.postData = (request, response) => {
  // Lit data.json
  fs.readFile("./src/model/data.json", (err, data) => {
     //si erreur
    if (err) {
      // Renvoie 500 + message + erreur
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    //sinon
    } else {
      //Transforme en json le fichier data.json
      const existingData = JSON.parse(data);
      let object = existingData.cheveux.findLast((obj) => obj.id)   
      let dynamicId = {"id": object.id+1, "name": request.body.name}  
      //ajoute la nouvelle donnée          
      existingData.cheveux.push(dynamicId); 
      fs.writeFile(
        "./src/model/data.json",
        JSON.stringify(existingData),
        (writeErr) => {
          //si erreur
          if (writeErr) {
               // renvoie statut 500 + message
            response.status(500).json({
              message: "Une erreur est survenue lors de l'écriture des données",
            });
          //sinon
          } else {
               // renvoie statut 200 + message
            response.status(200).json({
              message: "Les données ont été ajouté avec succès",
            });
          }
        }
      );
    }
  });
};

// Exporte une fonction permettant de modifier une donnée du tableau 'cheveux' via son id
exports.updateData = (request, response) => {
  // Lit data.json
  fs.readFile("./src/model/data.json", (err, data) => {
     //si erreur
    if (err) {
      // Renvoie 500 + message + erreur
      response.status(500).json({
        message: "Erreur de lecture",
      });
    //sinon
    } else {
      //Transforme en json le fichier data.json
      const existingData = JSON.parse(data);
       //Cherche l'id dans le tableau
      const dataById = existingData.cheveux.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      //Si ne trouve pas l'id
      if (!dataById) {
        // renvoie statut 404 + message
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      //sinon
      } else {
        //Modifie le name du tableau avec le name mis dans le body
        dataById.name = request.body.name;
        //Ecrit dans le fichier data.json
        fs.writeFile(
          "./src/model/data.json",
          JSON.stringify(existingData),
          (writeErr) => {
            //si erreur
            if (writeErr) {
              // renvoie statut 500 + message
              response.status(500).json({
                message:
                  "Une erreur est survenue lors de l'écriture des données",
              });
            //sinon
            } else {
              // renvoie statut 200 + message
              response.status(200).json({
                message: "Les données ont été mise à jour avec succès",
              });
            }
          }
        );
      }
    }
  });
};

// Exporte une fonction qui supprime une donnée du tableau 'cheveux' dans le fichier data.json
exports.deleteData = (request, response) => {
  // Lit data.json
  fs.readFile("./src/model/data.json", (err, data) => {
     //si erreur
    if (err) {
      // Renvoie 500 + message + erreur
      response.status(500).json({
        message: "Une erreur est survenue lors de la lecture des données",
      });
    //sinon
    } else {
      //Transforme en json le fichier data.json
      const existingData = JSON.parse(data);
       //Cherche l'id dans le tableau
      const dataById = existingData.cheveux.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      //Si ne trouve pas l'id
      if (!dataById) {
         // renvoie statut 404 + message
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      //sinon
      } else {
        //Supprime la donnée
        existingData.cheveux = existingData.cheveux.filter(
          (obj) => obj.id != parseInt(request.params.id)
        );
        //Ecrit dans le fichier data.json
        fs.writeFile(
          "./src/model/data.json",
          JSON.stringify(existingData),
          (writeErr) => {
            //Si erreur
            if (writeErr) {
               // renvoie statut 500 + message
              response.status(500).json({
                message:
                  "Une erreur est survenue lors de l'écriture des données",
              });
            //sinon
            } else {
              // renvoie statut 200 + message
              response.status(200).json({
                message: "Les données ont été mise à jour avec succès",
              });
            }
          }
        );
      }
    }
  });
};