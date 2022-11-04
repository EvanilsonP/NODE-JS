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

let count = 0;
// We have a socket.io server that does two things: 
// server(emit) -> client (receive) - countUpdated
// client(emit) -> server (receive) - increment
// Printing a message when a client connects
io.on('connection', (socket) => {
    console.log('New Websocket connection!');
    socket.emit('countUpdated', count);

    socket.on('increment', () => {
        count++
        // socket.emit('countUpdated', count); // Emiting an event for a specific connection
        io.emit('countUpdated', count);       // This one emits an event for EVERY SINGLE connection
    });
});

server.listen(port, () => console.log(`Server is up on port ${port}`));