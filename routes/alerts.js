const express = require('express')
const router = express.Router()
const controller = require('../controllers/alerts');

//router.use('/', securityHandler);

router.post('/', controller.createAlert);

router.get('/search', controller.getByStatus);

router.get('/:AlertId', controller.getByIdAlert);

router.delete('/:AlertId', controller.deleteAlert);

router.put('/:AlertId', controller.updateAlert);


module.exports = router;