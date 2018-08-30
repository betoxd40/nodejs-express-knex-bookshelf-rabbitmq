import Order from '../models/order';

const saveOrder = (req, res, next) => {
    Order.forge({
        meals: JSON.stringify(req.body.meals),
        totalCost: req.body.totalCost,
        address: req.body.address,
        Location: req.body.Location,
        restaurant: req.body.restaurant
    })
        .save()
        .then((order) => {
            res.json({
                success: true,
                /*data: {
                    id : order.get('id'),
                    totalCost : order.get('totalCost')
                }*/
            });
        })
        .catch(function (err) {
            res.status(500)
                .json({
                    success: false,
                    data: {message: err.message}
                });
        });
};

export {saveOrder};