// Importe le module fs
const fs = require("fs");

// Permet d'exporter la fonction qui permet de récupérer via l'id 
// une donnée du tableau 'cadeau' présent dans data.json
exports.getDataById = (request, response) => {
  // Lit le fichier data.json
  fs.readFile("./src/model/data.json", (err, data) => {
    // Si erreur à la lecture
    if (err) {
      // Renvoie un status 500, un message d'erreur et l'erreur
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    //Sinon
    } else {
      // Transforme le fichier data.json en du JSON
      const jsonData = JSON.parse(data);
      // Trouve dans le tableau 'cadeau' du fichier data.json l'id appelé dans la route
      const dataById = jsonData.cadeau.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      // Si l'id est trouvé
      if (dataById) {
        // Renvoie un status 200 et la donnée comportant l'id 
        response.status(200).json(dataById);
      // Sinon
      } else {
        // Renvoie une erreur 404 et un message
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      }
    }
  });
};

// Exporte la fonction qui permet de récupérer une donnée via son nom du tableau 'cadeau' dans data.json
exports.getDataByName = (request, response) => {
  // Lit le fichier data.json
  fs.readFile("./src/model/data.json", (err, data) => {
    // Si erreur
    if (err) {
      // Renvoie le statut 500, un message et l'erreur
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    // Sinon
    } else {
      // Transforme data.json en JSON
      const jsonData = JSON.parse(data);
      // Trouve le nom passé dans la route dans le tableau 'cadeau' du fichier data.json
      const dataByName = jsonData.cadeau.find(
        (obj) => obj.name == request.params.name
        
      );   
      //si le nom est trouvé   
      if (dataByName) {
        // Renvoie un status 200 et la donné comportant le nom 
        response.status(200).json(dataByName);
      // Sinon
      } else {
        // Renvoie un status 404 et un message
        response.status(404).json({
          message: "Aucun truc à ce nom",
        });
      }
    }
  });
};

//Exporte une fonction qui permet d'ajouter une donnée au tableau 'cadeau' dans data.json avec id dynamique
exports.postData = (request, response) => {
  // Lit le fichier data.json
  fs.readFile("./src/model/data.json", (err, data) => {
    // si erreur
    if (err) {
      // Renvoie un status 500 + message + erreur
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    // Sinon
    } else {
      // Transforme en JSON le fichier data.json
      const existingData = JSON.parse(data);
      // Trouve le dernier id présent dans le tableau 'cadeau'
      let object = existingData.cadeau.findLast((obj) => obj.id)
      // variable stockant la nouvelle donnée voulue avec id dynamique et name ajouté dans le body     
      let dynamicId = {"id": object.id+1, "name": request.body.name}   
      // Insère la nouvelle donnée dans le tableau 'cadeau'     
      existingData.cadeau.push(dynamicId); 
      // Ecrit dans le fichier data.json 
      fs.writeFile(
        "./src/model/data.json",
        // Change le JSON data.json en string data.json
        JSON.stringify(existingData),        
        (writeErr) => {
          // Si erreur à l'écriture
          if (writeErr) {
            // Renvoie status 500 + message + erreur
            response.status(500).json({
              message: "Une erreur est survenue lors de l'écriture des données",
            });
          // Sinon
          } else {
            // Renvoie status 200 et un message
            response.status(200).json({
              message: "Les données ont été ajouté avec succès",
            });
          }
        }
      );
    }
  });
};

// Exporte une fonction permettant de modifier une donnée du tableau 'cadeau' via son id
exports.updateData = (request, response) => {
  // Lit le fichier data.json
  fs.readFile("./src/model/data.json", (err, data) => {
    //Si erreur 
    if (err) {
      //Renvoie status 500 + message + erreur
      response.status(500).json({
        message: "Erreur de lecture",
      });
    } else {
      // Transforme en JSON le fichier data.json
      const existingData = JSON.parse(data);
      // Cherche l'id passé dans le tableau 'cadeau' du fichier data.json
      const dataById = existingData.cadeau.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      // Si id pas trouvé
      if (!dataById) {
        // Renvoie status 400 + message
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      // Sinon
      } else {
        // Remplace le name de l'id trouvé du tableau 'cadeau' par celui passé dans le body
        dataById.name = request.body.name;
        // Ecrit la modification dans le fichier data.json
        fs.writeFile(
          "./src/model/data.json",
          JSON.stringify(existingData),
          (writeErr) => {
            //Si erreur
            if (writeErr) {
              // Renvoie status 500 + message
              response.status(500).json({
                message:
                  "Une erreur est survenue lors de l'écriture des données",
              });
            } else {
              // Ecrit et renvoie status 200 + message
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

// Exporte une fonction qui supprime une donnée du tableau 'cadeau' dans le fichier data.json
exports.deleteData = (request, response) => {
  // Lit fichier data.json
  fs.readFile("./src/model/data.json", (err, data) => {
    // Si erreur
    if (err) {
      // Renvoie status 500 + message
      response.status(500).json({
        message: "Une erreur est survenue lors de la lecture des données",
      });
    //Sinon
    } else {
      //Transforme le fichier data.json en JSON
      const existingData = JSON.parse(data);
      //Trouve l'id passé dans la route dans le tableau 'cadeau'
      const dataById = existingData.cadeau.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      //Si l'id n'est pas trouvé
      if (!dataById) {
        // Renvoie status 404 + message
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      //Sinon
      } else {
        //Supprimer la donnée via l'id dans le tableau 'cadeau'
        existingData.cadeau = existingData.cadeau.filter(
          (obj) => obj.id != parseInt(request.params.id)
        );
        // Ecrit la suppression au fichier data.json
        fs.writeFile(
          "./src/model/data.json",
          JSON.stringify(existingData),
          (writeErr) => {
            // Si erreur
            if (writeErr) {
              // Renvoie status 500 + message
              response.status(500).json({
                message:
                  "Une erreur est survenue lors de l'écriture des données",
              });
            // Sinon
            } else {
              // Ecrit et renvoie status 200 + message
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