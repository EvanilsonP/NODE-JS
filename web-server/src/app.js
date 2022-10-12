const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
    res.send({
        name: 'Evanilson',
        age: 23
    });
});

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>');
});

app.get('/weather', (req, res) => { 
    res.send({
        forecast: 'It is snowing real bad.',
        location: 'New York'
    });
});

app.listen(3000, () => console.log("Server is up and running on port 3000."));