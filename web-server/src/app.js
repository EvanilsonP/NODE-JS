const path = require('path');
const express = require('express');

// Define paths for Express config
const public = path.join(__dirname, '../public');            // Manipulating directory path and accessing a specific folder
const viewsPath = path.join(__dirname, '../templates');      // Express is going to look for views folder by default. We can manipulate it.

const app = express();

// Setup handlebars engine and views location
app.set('views', viewsPath);                                 // And we can use it right here.
app.set('view engine', 'hbs');                               // Tells Express which extension to associate with the template when you call res.render() 

// Setup static directory to serve
app.use(express.static(public));

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