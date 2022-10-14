console.log("Client side javascript file is loaded.");

const weather = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.getElementById('msg-1');
const msg2 = document.getElementById('msg-2');

msg1.textContent = '';
msg2.textContent = '';

weather.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
   response.json().then((data) => {
        if(data.error) {
            msg1.textContent = data.error;
        } else {
            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
            console.log(data.location);
            console.log(data.forecast);
        }
   })
});
})
