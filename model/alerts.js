'use strict';

const createError = require('http-errors');
const mongoose = require('mongoose');
const checkDB = require('./db-connec').checkDB;
const Alert = require('../common/models/AlertModel');

// Definitions du modele
const AlertSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    type: {
        type: String,
        enum : ["weather", "sea", "transport"],
        required: true
    },
    label: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum : ["warning", "threat", "danger", "risk" ],
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    }
  });

// Models are created from schemas using the mongoose.model() method:
const AlertModel = mongoose.model('alert', AlertSchema , 'alerts');

const get = async (idAlert) => {
  await checkDB();
  const alert = await AlertModel.findOne({id: idAlert});
  if (alert === null) throw new createError.NotFound("No such alert");
  return alert;
};

const search = async (statusAlert) => {
    await checkDB();
    const alerts = await AlertModel.find({status: { $in: statusAlert }});
    return alerts;
};

const update = async (idAlert, proj, value) => {
    await checkDB();
    const alert = await AlertModel.findOneAndUpdate({id: idAlert}, value, {new: true});
    if (alert === null) throw new createError.NotFound("No such alert");
    return alert;
};

const remove = async (idAlert) => {
    await checkDB();
    const alert = await AlertModel.findOneAndDelete({id: idAlert});
    if (alert === null) throw new createError.NotFound("No such alert");
    return alert;
};


/**
 * Create an empty tenant with the given id and description.
 * If the tenant already exists throws an exception with the appropriate code and message
 * @param alertId id for the new tenant
 * @param type 
 * @param label
 * @param status
 * @param from
 * @param to
 * @returns {Promise} a promise resolved to the new tenant if creation succeeded
 */
const create = async (type, label, status, from, to) => {
  await checkDB();
  const uuidv1 = require('uuid/v1');
  const alertId = uuidv1(); // ⇨ '3b99e3e0-7598-11e8-90be-95472fb3ecbd'
  console.log(`create the alert "${alertId}"`);
  return AlertModel.create(new Alert(alertId, type, label, status, from, to));
};

// make this available to our tenant in our Node applications
module.exports = {
  model: AlertModel,
  get,
  search,
  create,
  update,
  remove
};