const socket = io()
// Sending data from server to client;
const $messageForm = document.querySelector('#message-form');
const $messageFormInput = document.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $SendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');
// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;

// name of the event has to match the one created on socket.emit();
socket.on('message', (message) => {
    console.log(message);
    const html = Mustache.render(messageTemplate, {
        message: message
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled'); // This line of code just disables the form once it's been submitted.
    const message = e.target.elements.message.value; // Targeting input

    socket.emit('sendMessage', message, (error) => {
        setTimeout(() => {
            $messageFormButton.removeAttribute('disabled'); // Enabling the form after sending a message;
        }, 0500);

        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error)
        };

        console.log('Message delivered!');
    });
});

$SendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    };

    navigator.geolocation.getCurrentPosition((position) => {
        $SendLocationButton.setAttribute('disabled', 'disabled'); // This line of code just disables the button once it is submitted
        
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location shared!');
            setTimeout(() => {
                $SendLocationButton.removeAttribute('disabled'); // This line of code just disables the button after it is sent.
            }, 2000);
        });
    });
});