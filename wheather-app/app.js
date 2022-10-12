const request = require('request');
const pc = require('picocolors');

// const url = 'http://api.weatherstack.com/current?access_key=3e86df59719916626c79c072269fa2fb&query=37.8267,-122.4233&units=m'; // Setting up to show temperature in Celsius / F / Kelvin

// request({ url: url, json: true}, (error, response) => { /// json: Saying we would like a request to parse this as JSON.

//     if(error) {
//         console.log(pc.bgRed("Unable to connect to wheather service!"));
//     } else if(response.body.error) {
//         console.log(pc.bgMagenta("Unable to find location"));
//     } else {
//         const temperature = response.body.current.temperature;
//         const feelslike = response.body.current.feelslike;
//         const overcast = response.body.current.weather_descriptions[0];
//         console.log(`${overcast}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`);
//     }
// });

const geoCodeURL = 'http://api.ipstack.com/134.201.250.155?access_key=46307f4fd7bd64a7b36a1ae2024bfe95';

request({url: geoCodeURL, json: true}, (error, response) => {
    if(error) {
        console.log(pc.bgRed("Unable to access API. No internet detected!"));
    } else if(response.body.error) {
        console.log(pc.bgRed("Unable to find location!"));
    } else {
        const lat = response.body.latitude;
        const long = response.body.longitude;
        console.log(lat, long);
    }

});

