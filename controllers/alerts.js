const config = require('config');
const alerts = require('../model/alerts');

/**
 * Gestion des tenants par le super administrateur
 * Permet de :
 * <li>chercher des alerts par ID ou Status
 * <li>créer une alert
 * <li>détruire une alert
 * <li>modifier une alert
 */
module.exports = {
  /**
   * Retourne les tenants de ce service
   * @param req
   * @param res réponse sous forme d'un tableau de tous les tenants
   * @param next
   */
  getByIdAlert: (req, res, next) => {
    const AlertId = req.params.AlertId;
    alerts.get(AlertId)
      .then(alerts => {
        res.status(200).json(alerts);
      })
      .catch(err => {
        console.error(`Unable to get this alert: ${err.message}`);
        if (err.code == "ECONNECT") {
          res.status(500).send(`${err.message}`);
        } 
        next(err);
      });
  },

  getByStatus: (req, res, next) => {

    const AlertStatus = req.query.status
    
    alerts.search(AlertStatus)
      .then(alerts => {
        res.status(200).json(alerts);
      })
      .catch(err => {
        console.error(`Unable to get all alerts with this status: ${err.message}`);
        if (err.code == "ECONNECT") {
          res.status(500).send(`${err.message}`);
        } 
        next(err);
      });

  },


  /**
   * Crée un tenant pour ce service
   * @param req le json contenant l'id et la description de la nouvelle alerte
   * @param res 201 : créé, 409: erreur car déjà créé, 500: autre erreur
   * @param next
   */
  createAlert: (req, res, next) => {

    const newAlert = req.body;
    alerts.create(newAlert.type, newAlert.label, newAlert.status, newAlert.from, newAlert.to)
      .then((created) => {
        res.status(201).send(created).end();
      })
      .catch(err => {
        console.error(`Unable to create the new alert: ${err.message}`);
        if (err.code == "ECONNECT") {
          res.status(500).send(`${err.message}`);
        }
        next(err);
      });
  },


  /**
   *
   * @param req
   * @param res
   * @param next
   */
  updateAlert: (req, res, next) => {
    const AlertId = req.params.AlertId;
    const new_alert = req.body;
    alerts.update(AlertId, 'alert', new_alert)
      .then((updated) => {
        res.status(200).send(updated).end();
      })
      .catch(err => {
        console.error(`Unable to update the alert: ${err.message}`);
        if (err.code == "ECONNECT") {
          res.status(500).send(`${err.message}`);
        } 
        next(err);
      });
  },

  deleteAlert: (req, res, next) => {
    const AlertId = req.params.AlertId;
    alerts.remove(AlertId)
      .then((deleted) => {
        res.status(200).send(deleted).end();
      })
      .catch(err => {
        console.error(`Unable to delete the alert: ${err.message}`);
        if (err.code == "ECONNECT") {
          res.status(500).send(`${err.message}`);
        } 
        next(err);
      });
  },
};