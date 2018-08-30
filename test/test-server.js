import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import Restaurant from "../server/models/restaurant";

const should = chai.should();

chai.use(chaiHttp);
describe('Restaurant', function() {

    Restaurant.destroy();

    beforeEach(function (done) {
        const newRestaurant = new Restaurant({
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
        });
        newRestaurant.save(function (err) {
            done();
        });
    });
    afterEach(function (done) {
        Restaurant.destroy();
        done();
    });
    it('should list ALL restaurants on /restaurants GET', (done) => {
        chai.request(server)
            .get('/api/restaurants')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});

