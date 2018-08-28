import Bookshelf from '../config/bookshelf';

import Restaurant from '../models/restaurant';

const Restaurants = Bookshelf.Collection.extend({
    model : Restaurant
});

export default Restaurants;