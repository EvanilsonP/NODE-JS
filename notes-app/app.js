const validator = require('validator');
const getNotes = require('./notes');

const msg = getNotes();
console.log(msg);

console.log(validator.isEmail('pevanilson99@gmail.com'));
console.log(validator.isURL("https://www.google.com/"));