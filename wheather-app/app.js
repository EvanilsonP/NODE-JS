const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=3e86df59719916626c79c072269fa2fb&query=37.8267,-122.4233';

request({ url: url}, (error, response) => { 
    const data = JSON.parse(response.body);             // Catching and parsing the body which contains a tons of info
    console.log(data.current);
});