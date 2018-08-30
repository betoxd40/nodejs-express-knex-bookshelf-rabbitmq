import Order from '../models/order';
import MapClient from '../../utils/maps';
import Restaurant from "../models/restaurant";
import {sendMessage, receivedMessage} from '../controllers/rabbit';

const saveOrder = async (req, res, next) => {
    try{
        Order.forge({
            meals: JSON.stringify(req.body.meals),
            totalCost: req.body.totalCost,
            address: req.body.address,
            Location: req.body.Location,
            restaurant: req.body.restaurant
        }).save();
        try{
            const restaurantModel = await new Restaurant({'id': req.body.restaurant}).fetch();
            const originDirection = restaurantModel.get('Location').lat + ',' + restaurantModel.get('Location').lng;
            const destinyDirection = req.body.Location.lat + ',' + req.body.Location.lng;
            const ETA = await new MapClient().getETA(originDirection, destinyDirection);
            sendMessage('restaurant', 'A new order');
            receivedMessage('restaurant');
            res.status(200)
                .json({
                    success: true,
                    ETA: ETA
                });
        } catch (e) {
            res.status(400)
                .json({
                    success: false,
                    message: e.message
                });
        }
    } catch (e) {
        res.status(400)
            .json({
                success: false,
                message: e.message
            });
    }
};

export {saveOrder};