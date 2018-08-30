import Bookshelf from '../config/bookshelf';

import Order from '../models/restaurant';

const Orders = Bookshelf.Collection.extend({
    model : Order
});

export default Orders;