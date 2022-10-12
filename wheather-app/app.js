const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
console.log(process.argv);

const address = process.argv[2];

if(!address) {
    console.log("Please provide an address!") 
    
} else {
    geoCode(address, (error, data) => {
        if(error) {
            return console.log(error);
        };
    
        console.log("Error", error);
        console.log('Data', data);
        forecast(data.lat, data.long, (error, forecastData) => {
    
            if(error) {
                return console.log(error);
            }
            console.log(data.location);
            console.log(forecastData);
        });    
    });
}
