import Bookshelf from "../config/bookshelf";
import Restaurant from "./restaurant";

const Order = Bookshelf.Model.extend({
    tableName: 'order',
    order: function() {
        return this.belongsTo(Restaurant);
    }
});

export default Order;