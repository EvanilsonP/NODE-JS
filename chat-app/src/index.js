const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io'); // Setting up support for socket.io

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 4000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
// Printing a message when a client connects
io.on('connection', (socket) => {
    console.log('New Websocket connection!');
    // Message when you visite the URL; // emit to a particular connection
    socket.emit('message', 'Welcome!'); 
    // Emit a message to everybody but that particular connection.
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);    // Message to every single client
    });

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    // When a user disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));