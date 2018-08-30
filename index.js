'use strict';

var bookshelf = require('./server/config/bookshelf');
import Restaurant from './server/models/restaurant';

var getInsertedArticle = (id, callback) =>{
    console.log("\nNow get the article from the db\n")
    Restaurant.where('id', id).fetch().then(function(article) {
        callback(article)
    })
}

var insertArticle = (callback) =>{
    // create a new entry in articles database
    new Restaurant({
        logo: "Sample logo",
        commercialName: "Sample commercialName",
        legalName: "Sample legalName",
        rating: 8,
        reviews: JSON.stringify([
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
        ]),
        meals: JSON.stringify([
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
        ]),
        commercialEmail: "Sample commercialEmail",
        adminNumber: "Sample adminNumber",
        address: "Sample address",
        Location: JSON.stringify({
            Lat: 'asdad',
            Lng: 'sadadsasd',
        })
    }).save()
        .then(function(saved) {
            console.log(saved)
            const insertedId = saved.attributes.id;
            callback(insertedId)
        })
}

// insert the article, and when we are done, destroy connection and get the inserted article
insertArticle(function(id){
    getInsertedArticle(id, function(article) {
        bookshelf.knex.destroy()
        console.log(article)
    })
});