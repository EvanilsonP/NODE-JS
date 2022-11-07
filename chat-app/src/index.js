const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');  // Setting up support for socket.io
const Filter = require('bad-words');
const { generateMessages, generateLocationMessage } = require('./utils/messages');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 4000
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');                      // Printing a message when a client connects

    socket.emit('message', generateMessages('Welcome!'));                     // Message when you visite the URL; // emit to a particular connection
                    
    socket.broadcast.emit('message', generateMessages('A new user has joined!'));  // Emit a message to everybody but that particular connection.

    socket.on('sendMessage', (message, callback) => {            // Message to every single client
        const filter = new Filter();                             // Preventing profanity

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        io.emit('message', generateMessages(message));
        callback();
    })

    socket.on('sendLocation', (coords, callback) => {           // Sharing location
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    })

    socket.on('disconnect', () => {                             // When a user disconnect
        io.emit('message', generateMessages('A user has left!'));
    });
});

server.listen(port, () => { console.log(`Server is up on port ${port}!`)});