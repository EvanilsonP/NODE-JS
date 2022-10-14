const request = require('request');

const geoCode = (address, callback) => {
    const url = 'http://api.ipstack.com/134.201.250.155  ' + encodeURIComponent(address) + ' ?access_key=46307f4fd7bd64a7b36a1ae2024bfe95';

    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.length === 0){
            callback("Unable to find location. Try another search!");
        } else {
           callback(undefined, {
                lat: body.latitude,
                long: body.longitude,
                location: body.location

           })
        }
    });
};

module.exports = geoCode;

