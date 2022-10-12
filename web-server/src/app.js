const path = require('path');
const express = require('express');

const publicDirectoryPath = path.join(__dirname, '../public');            // Manipulating directory path and accessing a specific folder
const publicDirectoryPath2 = path.join(__dirname, '..public/about.html');
const publicDirectoryPath3 = path.join(__dirname, '..public/help.html');

const app = express();

app.use(express.static(publicDirectoryPath));
app.use(express.static(publicDirectoryPath2));
app.use(express.static(publicDirectoryPath3));

app.get('/weather', (req, res) => { 
    res.send({
        forecast: 'It is snowing real bad.',
        location: 'New York'
    });
});

app.listen(3000, () => console.log("Server is up and running on port 3000."));