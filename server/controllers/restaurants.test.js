// import sinon from 'sinon';
import {expect} from 'chai';
import http_mocks from 'node-mocks-http';
import {getRestaurants,updateRateRestaurantById} from './restaurants';

const buildResponse = () => http_mocks.createResponse({eventEmitter: require('events').EventEmitter});

describe("controller Restaurants", () => {
    it('GET Restaurants should return true', async () => {
        const response = buildResponse();
        const request = http_mocks.createRequest({
            method: 'GET',
            url: '/api/restaurants',
        });
        response.on('end', () => {
            expect(response._isJSON()).to.be.true;
            expect(JSON.parse(response._getData()).success).to.be.true;
        });
        await getRestaurants(request, response);
    });

    it('GET RestaurantsRating should return true', async () => {
        const response = buildResponse();
        const request = http_mocks.createRequest({
            method: 'GET',
            url: '/api/restaurants/1/rating',
            params: {id: 1}
        });
        response.on('end', () => {
            expect(response._isJSON()).to.be.true;
            expect(JSON.parse(response._getData()).success).to.be.true;
            expect(JSON.parse(response._getData()).data.rating).to.be.a('number');
        });
        await updateRateRestaurantById(request, response);
    })
});