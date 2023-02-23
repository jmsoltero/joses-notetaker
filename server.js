const noteStuff = require('./routes/apiroutes')

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const api = require('./routes/apiroutes')
const fs = require('fs')

const staticStuff = require('./routes/staticroutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

app.use(noteStuff);
app.use(staticStuff);

//app.use('/api', api)

// app.get('/notes', (req,res) => 
//     res.sendFile(path.join(__dirname, '/public/notes.html')),
// );

// app.get('*', (req, res) => 
//     res.sendFile(path.join(__dirname, '/public/index.html'))
// );


app.listen(PORT, () => {
  console.log('Listening......')
})
