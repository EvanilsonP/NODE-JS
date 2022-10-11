const request = require('request');

const url = ''; // Setting up to show temperature in Celsius / F / Kelvin

request({ url: url, json: true}, (error, response) => { /// json: Saying we would like a request to parse this as JSON.
    // console.log(response.body.current);
    const temperature = response.body.current.temperature;
    const feelslike = response.body.current.feelslike;
    const overcast = response.body.current.weather_descriptions[0];

    console.log(`${overcast}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`);
});