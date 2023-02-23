const fs = require('fs');
//const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const db = require('../db/db.json');
const router = require('express').Router();
const uniqid = require('uniqid');

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
        res.send(data)
    })
});

// router.get('/api/notes', (req, res) => {
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
//   });


router.post('/api/notes', (req, res) => { 
    let newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;

        let newData = JSON.parse(data);

        newData.push(newNote);
        console.log(newData)

        fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
            if (err) throw err;

            res.send(newData);
            console.log(newData);
        } )
    });
})

router.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }


    let notes = JSON.parse(data);
    const index = notes.findIndex(note => note.id === id);

    if (index === -1){
        return res.status(404).send('note not found');
    }

    notes.splice(index, 1)
    
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), 'utf8', err => {
        if(err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }

        return res.json(notes)
        });
    });
});

module.exports = router;