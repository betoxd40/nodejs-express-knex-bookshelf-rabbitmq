exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('restaurant', function(table) {
            table.increments('id').primary();
            table.text('logo');
            table.text('commercialName');
            table.text('legalName');
            table.float('rating');
            table.jsonb('reviews');
            table.jsonb('meals');
            table.text('commercialEmail');
            table.text('adminNumber');
            table.text('address');
            table.json('Location');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('restaurant')
    ])
};

