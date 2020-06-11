const mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({ 
    username: {
        type:String,
        required:true
    }, 
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobilenumber:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    },
    roles:{
        type:Array,
        required:true
    },
    dateinmillisec: { type: Number, required:true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);