const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;
const api = require('./routes/notes')
const fs = require('fs')

const notes = [];


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html')),
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);



app.post('/api/notes', (req, res) =>{
    console.log(`${req.method} request received to add a note`);

    if (product && review && username) {
        // Variable for the object we will save
        const newReview = {
          product,
          review,
          username,
          upvotes: Math.floor(Math.random() * 100),
          review_id: uuid(),
        };
    
        // Convert the data to a string so we can save it
        const reviewString = JSON.stringify(newReview);
    
        // Write the string to a file
        fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
          err
            ? console.error(err)
            : console.log(
                `Review for ${newReview.product} has been written to JSON file`
              )
        );
    
        const response = {
          status: 'success',
          body: newReview,
        };
    
        console.log(response);
        res.status(201).json(response);
      } else {
        res.status(500).json('Error in posting review');
      }
    })









app.listen(PORT, () => console.log('listening on port 3001'));

