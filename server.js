const express = require('express');
const { fstat } = require('fs');
const app = express();
const path = require('path');

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
        JSON.stringify({ notes: notesArray } )
    );
    return note;
};


app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    // read db.json file and return all saved notes as JSON
});

app.post('/api/notes', (req,res) => {
    // receive new note to save, add to db.json, retun new note to client
    req.body.id = note.length.toString();

    const note = createNewNote(req.body, notes);
    
    res.json(note);

    // find way to ad dunique id when saved (npm packages???)
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server on PORT ${PORT}`);
});