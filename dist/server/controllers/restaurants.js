'use strict';

// var Restaurant = require('../models/restaurant');
var Restaurants = require('../collections/restaurants');

module.exports = {
    getRestaurants: function getRestaurants(req, res) {
        Restaurants.forge().fetch().then(function (collection) {
            res.json({
                error: false,
                data: collection.toJSON()
            });
        }).catch(function (err) {
            res.status(500).json({
                error: true,
                data: { message: err.message }
            });
        });
    }
};