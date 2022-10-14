const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'api.weatherstack.com/current?access_key=3e86df59719916626c79c072269fa2fb&query='+ latitude + ', '+ longitude +'&units=m';

    request({url: url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to wheather service!', undefined);

        } else if(body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, 
                console.log(`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out`)
            );
        }
    });
}

module.exports = forecast;