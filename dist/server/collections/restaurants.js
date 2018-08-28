'use strict';

var Bookshelf = require('../config/bookshelf');

var Restaurant = require('../models/restaurant');

var Restaurants = Bookshelf.Collection.extend({
    model: Restaurant
});

module.exports = Restaurants;