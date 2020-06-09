const mongoose = require('mongoose')
const Employee = require('../Models/Employee')

//insert one employee
module.exports.insert = (req,res) => {
    console.log(req.body);
    const {username,fullname,email,mobilenumber,password} = req.body;
    const employee = new Employee({
        username,
        fullname,
        email,
        mobilenumber,
        password,
        dateinmillisec:Date.now()
    })
    employee.save().then(()=>res.send({"message":"SAVED"}));
}

//get all employees
module.exports.get = (req,res) => {
    Employee.find().then((err,docs) => res.send(docs))
}
