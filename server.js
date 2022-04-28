const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const { notes } = require('./db/db');

const PORT = process.env.PORT || 3001;

// add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
};

function findByTitle(title, notesArray) {
    const result = notesArray.filter(notes => notes.title === title)[0];
    return result;
}

// get notes file
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


// get saved notes
app.get('/api/notes', (req,res) => {
    // read db.json file and return all saved notes as JSON
    res.json(notes);
});

// get note by title
app.get('/notes/:title', (req,res) => {
    const result = findByTitle(req.params.title, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// add a new note
app.post('/api/notes', (req,res) => {
    // receive new note to save, add to db.json, retun new note to client
    const note = createNewNote(req.body, notes);
    res.json(note);
    // find way to add unique id when saved (npm packages???)
});

// get landing page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server on PORT ${PORT}`);
});