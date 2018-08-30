import axios from 'axios';


class MapClient {
    constructor() {
        this.axios = axios;
        this.apiKey = 'AIzaSyBlSJra2EH7VOfiT1rpA1ECoKigazcIePY';
        this.baseURL = 'https://maps.googleapis.com/maps/api';
        this.currentLocation = '-34.5974917,-58.4225502'
    }

    async getPlaces(location) {
        try {
            const parameters = {
                fields: 'photos,formatted_address,name,rating,opening_hours,geometry',
                radius: 1500
            }
            const response = await this.axios
                .get(`${this.baseURL}/place/nearbysearch/json?location=${location || this.currentLocation}&radius=${parameters.radius}&type=restaurant&keyword=cruise&key=${this.apiKey}`);
            return { status: response.data.status, result: response.data.results };
        } catch (error) {
            console.error(error, 'Getting info from google map API');
            return Promise.reject(error)
        }
    }

    async getETA(from, to) {
        // API EXAMPLE: https://developers.google.com/maps/documentation/distance-matrix/start
        const response = await this.axios
            .get(`${this.baseURL}/distancematrix/json?units=imperial&origins=${from}&destinations=${to}&key=${this.apiKey}`);
        console.log(response.data.rows[0].elements[0].duration);
        return response.data.rows[0].elements[0].duration;
    }
}

export default MapClient;