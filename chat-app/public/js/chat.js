const socket = io();
// Sending data from server to client;
// name of the event has to match the one created on socket.emit();
socket.on('countUpdated', (count) => {
    console.log('The count has been updated.', count);
});

document.querySelector('#increment').addEventListener('click', () => {
    console.log('clicked');
    socket.emit('increment');
});