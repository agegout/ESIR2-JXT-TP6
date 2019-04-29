const config = require('config');
const tenants = require('../models/AlertModel');

/**
 * Gestion des tenants par le super administrateur
 * Permet de :
 * <li>lister les tenants
 * <li>créer un tenant
 * <li>récupérer les paramètres administrateur du tenant
 * <li>modifier les paramètres administrateur du tenant
 */
module.exports = {
  /**
   * Retourne les tenants de ce service
   * @param req
   * @param res réponse sous forme d'un tableau de tous les tenants
   * @param next
   */
  getByIdAlert: (req, res, next) => {
    // TODO la pagination
    tenants.getAll()
      .then(tenants => {
        res.status(200).json(tenants);
      })
      .catch(err => {
        errorLog(`Unable to get all tenants: ${err.message}`);
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
    const url = config.get('basePath');
    const addAlertUri = (res, idAlert) => {
      res.header("link",
        new links()
          .add({
            href: `${url}/alerts/${idAlert}`,
            rel: "self",
            title: "Reference to the alert uri",
            name: "alert",
            method: "GET",
            type: "application/json"
          })
          .build()
      );
    };

    const newAlert = req.body;
    tenants.create(newAlert.id, newAlert.texts.type, newAlert.texts.label, newAlert.texts.status, newAlert.texts.from, newAlert.texts.to)
      .then(Alert => {
        addAlertUri(res, alert.id);
        res.status(201).end();
      })
      .catch(err => {
        errorLog(`Unable to create the new alert: ${err.message}`);
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
    const AlertId = req.getPrm('alert', 'value', 'id');
    const new_alert = req.body;
    tenants.update(alertId, 'alert', new_alert)
      .then(() => {
        res.status(200).end();
      })
      .catch(err => {
        errorLog(`Unable to update the alert: ${err.message}`);
        next(err);
      });
  },
};


//TODO