// const chalk = require ('chalk');
const yargs = require('yargs');
const getNotes = require('./notes.js');

// Customize yargs version
yargs.version('17.6.0');


// Create add command:
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function() {
        console.log('Adding a new note!'); 
    }
});

// Create Remove command:
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function() {
        console.log("Removing a note.")
    }
});

// Create Read command:
yargs.command({
    command: 'read',
    describe: 'Read a note',
    handler: function() {
        console.log('Reading all notes.')
    }
});

// Create List command: 
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function() {
        console.log('listing out all notes.')
    }
});

// add, remove, read, list

console.log(yargs.argv);

