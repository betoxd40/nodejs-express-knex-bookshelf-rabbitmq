import express from 'express';
import {getRestaurants, deleteRestaurant, updateRestaurant, updateRateRestaurantById} from '../controllers/restaurants';

module.exports = (function () {

    const api = express.Router();

    api.get('/restaurants', getRestaurants);
    api.delete('/restaurants/:id', deleteRestaurant);
    api.put('/restaurants/:id', updateRestaurant);
    api.get('/restaurants/:id', updateRateRestaurantById);

    return api;

})();