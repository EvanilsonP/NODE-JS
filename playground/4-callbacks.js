setTimeout(() => {
    console.log("Two seconds are up!");
}, 2000);

const names = ['Andrew', 'Jen', 'Jess'];
const shortNames = names.filter((name) => {
    return name.length <= 4;
});

const geoCode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        };
    
        callback(data);
    }, 2000);
};

geoCode('Fortaleza', (data) => {
    console.log(data);
});


const add = (a, b, callback) => {
    setTimeout(() => {
        let sum = a + b;
        callback(sum);
    }, 2000);
};

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
});