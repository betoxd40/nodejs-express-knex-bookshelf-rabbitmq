import Bookshelf from '../config/bookshelf';
import Order from './order';

const Restaurant = Bookshelf.Model.extend({
    tableName: 'restaurant',
    restaurant: function() {
        return this.hasMany(Order);
    }
});

export default Restaurant;