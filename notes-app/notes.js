const fs = require('fs');
const getNotes = function () {
    console.log("Your notes...");
}

const addNotes = function (title, body) {
    const notes = loadNotes();
    const duplicateNotes = notes.filter((note) => { // Checking weather there is duplica notes or not
        return note.title === title;
    });

    if(duplicateNotes.length === 0) { //  This means there is no duplica notes
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log("New note added!");

    } else {
        console.log('Note title taken!');
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (e) {
        return [];
    }

}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes
}
