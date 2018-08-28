// var Restaurant = require('../models/restaurant');
import Restaurants from '../collections/restaurants';

    const getRestaurants = (req, res) => {
        Restaurants.forge()
            .fetch()
            .then( (collection) =>{
                res.json({
                    error : false,
                    data : collection.toJSON()
                })
            })
            .catch((err) => {
                res.status(500)
                    .json({
                        error : true,
                        data : { message : err.message }
                    })
            })
    }
    export { getRestaurants };