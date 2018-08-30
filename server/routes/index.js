import express from 'express';
import {getRestaurants, deleteRestaurant, updateRestaurant, updateRateRestaurantById} from '../controllers/restaurants';
import {saveOrder} from '../controllers/orders';

module.exports = (function () {

    const api = express.Router();

    api.get('/restaurants', getRestaurants);
    api.delete('/restaurants/:id', deleteRestaurant);
    api.put('/restaurants/:id', updateRestaurant);
    api.get('/restaurants/:id/rating', updateRateRestaurantById);

    api.post('/orders', saveOrder);

    return api;

})();