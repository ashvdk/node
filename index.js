const express = require('express');
const app = express();

app.use((req,res)=>{
    res.send({"message":"Hello world"})
})

app.listen(3300,()=>console.log("Listening on port 3300"));