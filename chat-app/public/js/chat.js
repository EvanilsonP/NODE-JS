const socket = io();
// Sending data from server to client;
// name of the event has to match the one created on socket.emit();
// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated.', count);
// });

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('clicked');
//     socket.emit('increment');
// });

socket.on('message', (message) => {
    console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value; // Targeting input
    socket.emit('sendMessage', message);
});