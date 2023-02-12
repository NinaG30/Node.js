const fs = require("fs");

// Permet d'exporter la fonction qui permet de récupérer via l'id 
// une donnée du tableau 'main' présent dans data.json
exports.getDataById = (request, response) => {
  fs.readFile("./src/model/data.json", (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    } else {
      const jsonData = JSON.parse(data);
      const dataById = jsonData.main.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      if (dataById) {
        response.status(200).json(dataById);
      } else {
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      }
    }
  });
};

// Exporte la fonction qui permet de récupérer une donnée via son nom du tableau 'main' dans data.json
exports.getDataByName = (request, response) => {
  fs.readFile("./src/model/data.json", (err, data) => {
    if (err) {
      response.statut(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    } else {
      const jsonData = JSON.parse(data);
      const dataByName = jsonData.main.find(
        (obj) => obj.name == request.params.name
        
      );      
      if (dataByName) {
        response.status(200).json(dataByName);
      } else {
        response.status(404).json({
          message: "Aucun truc à ce nom",
        });
      }
    }
  });
};

//Exporte une fonction qui permet d'ajouter une donnée au tableau 'main' dans data.json avec id dynamique
exports.postData = (request, response) => {
  fs.readFile("./src/model/data.json", (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
        error: err,
      });
    } else {
      const existingData = JSON.parse(data);
      let object = existingData.main.findLast((obj) => obj.id)// cherche dernier objet;      
      let dynamicId = {"id": object.id+1, "name": request.body.name}           
      existingData.main.push(dynamicId); 
      fs.writeFile(
        "./src/model/data.json",
        JSON.stringify(existingData),
        (writeErr) => {
          if (writeErr) {
            response.status(500).json({
              message: "Une erreur est survenue lors de l'écriture des données",
            });
          } else {
            response.status(200).json({
              message: "Les données ont été ajouté avec succès",
            });
          }
        }
      );
    }
  });
};

// Exporte une fonction permettant de modifier une donnée du tableau 'main' via son id
exports.updateData = (request, response) => {
  fs.readFile("./src/model/data.json", (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Erreur de lecture",
      });
    } else {
      const existingData = JSON.parse(data);
      const dataById = existingData.main.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      if (!dataById) {
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      } else {
        dataById.name = request.body.name;
        fs.writeFile(
          "./src/model/data.json",
          JSON.stringify(existingData),
          (writeErr) => {
            if (writeErr) {
              response.status(500).json({
                message:
                  "Une erreur est survenue lors de l'écriture des données",
              });
            } else {
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

// Exporte une fonction qui supprime une donnée du tableau 'main' dans le fichier data.json
exports.deleteData = (request, response) => {
  fs.readFile("./src/model/data.json", (err, data) => {
    if (err) {
      response.status(500).json({
        message: "Une erreur est survenue lors de la lecture des données",
      });
    } else {
      const existingData = JSON.parse(data);
      const dataById = existingData.main.find(
        (obj) => obj.id === parseInt(request.params.id)
      );
      if (!dataById) {
        response.status(404).json({
          message: "Aucun objet trouvé avec cet id",
        });
      } else {
        existingData.main = existingData.main.filter(
          (obj) => obj.id != parseInt(request.params.id)
        );
        fs.writeFile(
          "./src/model/data.json",
          JSON.stringify(existingData),
          (writeErr) => {
            if (writeErr) {
              response.status(500).json({
                message:
                  "Une erreur est survenue lors de l'écriture des données",
              });
            } else {
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