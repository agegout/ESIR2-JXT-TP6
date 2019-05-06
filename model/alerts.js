'use strict';

const createError = require('http-errors');
const mongoose = require('mongoose');
const checkDB = require('./db-connec').checkDB;
const Alert = require('../common/models/AlertModel');

// Definitions du modele
const alertSchema = new mongoose.Schema({
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
    const alerts = await AlertModel.find({status: statusAlert});
    return alerts;
};

const update = async (idAlert, proj, value) => {
    await checkDB();
    const update = {$set: {}};
    update.$set[proj] = value;
    const talert = await AlertModel.findOneAndUpdate({id: idAlert}, update, {new: true});
    if (alert === null) throw new createError.NotFound("No such alert");
    return tenant[proj];
};

const remove = async (idAlert) => {
    await checkDB();
    const alert = await AlertModel.findByIdAndDelete({id: idAlert});
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
const create = async (alertId, type, label, status, from, to) => {
  await checkDB();
  const alert = await AlertModel.findOne({id: alertId}, {id: 1});
  if (alert !== null) {
    error(`try to create the alert "${alertId}" that already exists`);
    throw new createError.Conflict("Already defined");
  }
  debug(`create the alert "${alertId}"`);
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