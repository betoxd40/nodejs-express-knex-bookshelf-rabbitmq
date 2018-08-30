import Restaurant from '../models/restaurant';
import Restaurants from '../collections/restaurants';

const calculateRating = (reviewLength, totalRating) => {
    return reviewLength * totalRating / reviewLength;
};

const addReview = (reviewBody, reviewBD) => {
    if(reviewBD){
        reviewBody.map(review => {
            reviewBD.push(review);
        });
        return JSON.stringify(reviewBD);
    }
    return JSON.stringify(reviewBody);
};

const getRestaurants = async (req, res) => {
    try{
        const restaurantModel = await Restaurants.forge().orderBy('rating', 'DESC').fetch();
        res.status(200)
            .json({
            success: true,
            data: restaurantModel.toJSON()
        })
    } catch (e) {
        res.status(e)
            .json({
                success: false,
                data: {message: e.message}
            })
    }
};

const deleteRestaurant = (req, res) => {
    Restaurant.forge({id: req.params.id})
        .fetch({require: true})
        .then((restaurant) => {
            restaurant.destroy()
                .then(() => {
                    res.json({
                        success: true,
                        // data: {message: 'Restaurant deleted'}
                    })
                })
                .catch(() => {
                    res.status(500)
                        .json({
                            success: false,
                            data: {message: err.message}
                        })
                })
        })
        .catch((err) => {
            res.status(500)
                .json({
                    success: false,
                    data: {message: err.message}
                })
        })
};

const updateRestaurant = (req, res) => {
    Restaurant.forge({
        id: req.params.id
    })
        .fetch({
            require: true
        })
        .then((restaurant) => {
            restaurant.save({
                logo: req.body.logo || restaurant.get('logo'),
                commercialName: req.body.commercialName || restaurant.get('commercialName'),
                legalName: req.body.legalName || restaurant.get('legalName'),
                rating: req.body.rating || restaurant.get('rating'),
                reviews: addReview((req.body.reviews), (restaurant.get('reviews'))),
                meals: JSON.stringify(req.body.meals) || JSON.stringify(restaurant.get('meals')),
                commercialEmail: req.body.commercialEmail || restaurant.get('commercialEmail'),
                adminNumber: req.body.adminNumber || restaurant.get('adminNumber'),
                address: req.body.address || restaurant.get('address'),
                Location: JSON.stringify(req.body.Location) || JSON.stringify(restaurant.get('Location')),
            })
                .then(() => {
                    res.json({
                        success: true,
                        // data: {message: "restaurant update"}
                    })
                })
                .catch((err) => {
                    res.json({
                        success: false,
                        data: {message: err.message}
                    })
                })
        })
        .catch((err) => {
            res.status(400)
                .json({
                    success: false,
                })
        })
};

const updateRateRestaurantById = (req, res) =>{
    Restaurant.where({id: req.params.id}).fetch().then((restaurant) => {
        const reviews = restaurant.toJSON().reviews;
        let totalRating = 0;
        reviews.map(review => {
            totalRating = totalRating + review.rating;
        });
        const result = calculateRating(reviews.length, totalRating);
        res.json({
            success: true,
            data: { rating: result }
        })
    }).catch((err) => {
        res.status(400)
            .json({
                success: false,
            })
    })
};


export {getRestaurants, deleteRestaurant, updateRestaurant, updateRateRestaurantById};