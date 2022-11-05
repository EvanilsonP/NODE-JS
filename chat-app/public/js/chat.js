const socket = io()
// Sending data from server to client;
// name of the event has to match the one created on socket.emit();
socket.on('message', (message) => {
    console.log(message)
});

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value; // Targeting input

    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error)
        };

        console.log('Message delivered!');
    });
});

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    };

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!')  ;
        });
    });
});