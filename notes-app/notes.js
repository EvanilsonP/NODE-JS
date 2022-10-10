const fs = require('fs');
const pc = require('picocolors');

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if(!duplicateNote) { //  If there is no duplicate note
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(pc.green("New note added!"));

    } else {
        console.log(pc.red('Warning: Note title already taken!'));
    }
}

const saveNotes =  (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (e) {
        return [];
    }

}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    });

    if(notes.length > notesToKeep.length) {                 // Checking whether the note was removed or not and giving a message
        console.log(pc.green("Note removed successfully!"));
    } else {
        console.log(pc.red("No note found!"));
    }

    saveNotes(notesToKeep);
}

const listNotes = () => {
    const notes = loadNotes();

    console.log(pc.bgYellow('Your notes'));

    notes.forEach(note => {
      console.log(note.title);  
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note) {
        console.log(pc.bgGreen(note.title));
        console.log(note.body);
    } else {
        console.log(pc.bgRed("No note found!"));
    }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
