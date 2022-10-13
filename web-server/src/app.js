const path = require('path');
const express = require('express');

const public = path.join(__dirname, '../public');            // Manipulating directory path and accessing a specific folder
const publicAbout = path.join(__dirname, '..public/about.html');
const publicHelp = path.join(__dirname, '..public/help.html');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(public));
app.use(express.static(publicAbout));
app.use(express.static(publicHelp));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Evanilson P'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Evanilson P'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Evanilson P'
    })
});

app.get('/weather', (req, res) => { 
    res.send({
        forecast: 'It is snowing real bad.',
        location: 'New York'
    });
});

app.listen(3000, () => console.log("Server is up and running on port 3000."));