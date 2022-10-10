const fs = require('fs');
const pc = require('picocolors');

const getNotes =  () => {
    console.log("Your notes...");
}

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => { // Checking whether there is duplicate notes or not
        return note.title === title;
    });

    if(duplicateNotes.length === 0) { //  This means there is no duplicate notes
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

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
}
