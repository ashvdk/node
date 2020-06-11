const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./Route')
//helpers
app.use(cors())
app.use(bodyParser.json())
app.options('*', cors())
app.use(routes);



//database and port
mongoose.connect(`mongodb+srv://ashvdk:I4OqnhVtjKg0q4RJ@cluster0-5eb4q.mongodb.net/test?retryWrites=true&w=majority`)
.then(result => {
    app.listen(3300,()=>console.log("Listening and connected to database"));
})
.catch(err => {
    console.log(err);
})
