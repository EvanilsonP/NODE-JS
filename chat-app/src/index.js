const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io') // Setting up support for socket.io
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 4000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    // Printing a message when a client connects
    console.log('New WebSocket connection');
    // Message when you visite the URL; // emit to a particular connection
    socket.emit('message', 'Welcome!');
     // Emit a message to everybody but that particular connection.
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message, callback) => {   // Message to every single client
        const filter = new Filter();                    // Preventing profanity

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.emit('message', message);
        callback();
    });

    // Sharing my location
    socket.on('sendLocation', (coords, callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback();
    });
    // When a user disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    });
});

server.listen(port, () => { console.log(`Server is up on port ${port}!`) });