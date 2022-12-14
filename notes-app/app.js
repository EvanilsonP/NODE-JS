const yargs = require('yargs');
const notes = require('./notes.js');

// Customize yargs version
yargs.version('17.6.0');

// Create add command:
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
});

// Create Remove command:
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

// Create Read command:
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

// Create List command: 
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
       notes.listNotes();
    }
});

yargs.parse();

