const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');  // Setting up support for socket.io
const Filter = require('bad-words');
const { generateMessages, generateLocationMessage } = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 4000
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');                      // Printing a message when a client connects

    socket.on('join', ({ username, room}, callback) => {
        // Join allows us to join a given chat room and we pass to it the name of the room where trying to join.
        const { error, user }= addUser({id: socket.id, username, room});

        if(error) {
            return callback(error);
        }
        socket.join(user.room);      // Socket.emit: that sends an event to a specific client, io.emmit: sends an event to every connected client
        // io.to.emit: what this does is it emits an event to everybody in a specific room.
        // broadcast.to.emit: This is sending an event to everyone except for the specific client
        socket.emit('message', generateMessages('Admin', 'Welcome!'));                     // Message when you visite the URL; // emit to a particular connection
        // socket.broadcast.emit('message', generateMessages('A new user has joined!'));  // Emit a message to everybody but that particular connection.
        socket.broadcast.to(user.room).emit('message', generateMessages('Admin', `${user.username} has joined!`));
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });
        callback();
    });

    socket.on('sendMessage', (message, callback) => {            // Message to every single client
        const user = getUser(socket.id);
        const filter = new Filter();                             // Preventing profanity

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!');
        }

        // io.emit('message', generateMessages(message));
        io.to(user.room).emit('message', generateMessages(user.username, message));
        callback();
    })

    socket.on('sendLocation', (coords, callback) => {           // Sharing location
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });

    socket.on('disconnect', () => {                             // When a user disconnect
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.room).emit('message', generateMessages('Admin', `${user.username} has left!`));
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

server.listen(port, () => { console.log(`Server is up on port ${port}!`)});