const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;
const api = require('./routes/notes')
const fs = require('fs')


const noteStuff = require('./routes/notes')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html')),
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.use(noteStuff);

app.listen(PORT, () => {
  console.log('Listening......')
})
