const fs = require('fs');

// const book = {
//     title: 'The ego is the enemy',
//     author: 'Ryan Holiday'
// }

// const bookJSON = JSON.stringify(book);                    // Converting to JSON
// fs.writeFileSync('1-json.json', bookJSON);

// console.log(bookJSON);

// const parsedData = JSON.parse(bookJSON);                  // Converting to an object
// console.log(parsedData.author);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = dataBuffer.toString();
// const data = JSON.parse(dataJSON);
// console.log(data.title);

// console.log(dataBuffer.toString()); // Returning binarial data, but using toString it comes out as it was originally.

const dataBuffer = fs.readFileSync('1-json.json');
const DATAJSON1 = dataBuffer.toString();
const user = JSON.parse(DATAJSON1);

user.name = 'Evanilson P.';
user.age = 23;

const userJSON = JSON.stringify(user);
fs.writeFileSync('1-json.json', userJSON);