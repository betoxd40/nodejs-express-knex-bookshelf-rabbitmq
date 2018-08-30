import bookshelf from './server/config/bookshelf';
import Restaurant from './server/models/restaurant';
import MapClient from './utils/maps';

const insertArticle = async () =>{
    // create a new entry in articles database

    try {
        let restaurants = [];
        const googleMapsRes = await new MapClient().getPlaces();
        googleMapsRes.result.map(restaurantResp => {
            const restaurant = {
                logo: restaurantResp.icon,
                commercialName: restaurantResp.name,
                legalName: restaurantResp.name,
                rating: restaurantResp.rating,
                address: restaurantResp.vicinity,
                Location: restaurantResp.geometry.location,
                reviews: [],
                meals: [],
                commercialEmail: restaurantResp.email || 'email dont found',
                adminNumber: restaurantResp.adminPhone || 'admin phone dont found'
            };
            restaurants.push(restaurant);

        });
        restaurants.map(async restaurant => {
            restaurant.reviews = JSON.stringify([
                {
                    name: 'Sample Name',
                    description: 'Sample description',
                    rating: 4.32,
                },
                {
                    name: 'Sample Name 2',
                    description: 'Sample description 2',
                    rating: 4.32,
                }
            ]);
            restaurant.meals = JSON.stringify([
                {
                    name: 'Sample Name',
                    description: 'Sample description',
                    price: 4.32,
                },
                {
                    name: 'Sample Name 2',
                    description: 'Sample description 2',
                    price: 4.32,
                }
            ]);
            const saved = await new Restaurant(restaurant).save();
        });
        console.log('FILL RESTAURANT TABLE FROM GOOGLE MAP API');
        bookshelf.knex.destroy();
    } catch (error) {
        return Promise.reject(error);
    }
}

// insert the article, and when we are done, destroy connection and get the inserted article
insertArticle();