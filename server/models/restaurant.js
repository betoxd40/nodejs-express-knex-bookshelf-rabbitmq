import Bookshelf from '../config/bookshelf';

// create the Article model, it will include all of the attributes of the table.
// the hasTimestamps: true command will automatically populate the created_at and updated_at columns
const Restaurant = Bookshelf.Model.extend({
    tableName: 'restaurant'
});

export default Restaurant;