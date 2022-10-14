const path = require('path');
const express = require('express');
const hbs = require('hbs');

// Define paths for Express config
const public = path.join(__dirname, '../public');            // Manipulating directory path and accessing a specific folder
const viewsPath = path.join(__dirname, '../templates/views');      // Express is going to look for views folder by default. We can manipulate it.
const partiaslPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup handlebars engine and views location
app.set('views', viewsPath);                                 // And we can use it right here.
app.set('view engine', 'hbs');                               // Tells Express which extension to associate with the template when you call res.render() 
hbs.registerPartials(partiaslPath);

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
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Evanilson P'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Evanilson P',
        errorMesage: 'Help article not found!'
    });
});

app.get('/weather', (req, res) => { 
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    res.send({
        forecast: 'It is snowing real bad.',
        location: 'New York',
        address: req.query.address
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search)
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'Evanilson P',
        errorMesage: 'Page not found.'
    });
});

app.listen(3000, () => console.log("Server is up and running on port 3000."));