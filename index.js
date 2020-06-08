const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
app.use(cors())
app.post("/getme",(req,res)=>{
        const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => res.send({"message":"saved"}));
})

mongoose.connect(`mongodb+srv://ashvdk:I4OqnhVtjKg0q4RJ@cluster0-5eb4q.mongodb.net/test?retryWrites=true&w=majority`)
.then(result => {
    app.listen(3300,()=>console.log("Listening and connected to database"));
})
.catch(err => {
    console.log(err);
})
