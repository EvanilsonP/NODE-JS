const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io'); // Setting up support for socket.io

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));
// We have a socket.io server that does two things: 
// server(emit) -> client (receive) - countUpdated
// client(emit) -> server (receive) - increment
// Printing a message when a client connects
io.on('connection', (socket) => {
    console.log('New Websocket connection!');
    // Message when you visite the URL; // emit to a particular connection
    socket.emit('message', 'Welcome!'); 
    // Emit a message to everybody byt that particular connection.
    socket.broadcast.emit('message', 'A new user has joined!');

    socket.on('sendMessage', (message) => {
        io.emit('message', message);    // Message to every single client
    });
    // When a user disconnect
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!');
    });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));