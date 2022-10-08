import validator from 'validator';
import getNotes from './notes.js';
import chalk from 'chalk';

const msg = getNotes();
console.log(msg);

// console.log(validator.isEmail('pevanilson99@gmail.com'));
// console.log(validator.isURL("https://www.google.com/"));
console.log(chalk.green.bold.inverse("Success!"));
console.log(chalk.red.bold.inverse("You've been hacked by me!"));