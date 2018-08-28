var express = require('express');

var restaurantsCtrl = require('../controllers/restaurants');

module.exports = (function () {

    var api = express.Router();

    api.get('/restaurants', restaurantsCtrl.getRestaurants);

    return api;

})();