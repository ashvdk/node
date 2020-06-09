const express = require('express');
const app = express();
const employee = require('../ReqResponseHandler/Employee')

//office employees
app.post("/insert-employees",employee.insert)
app.post("/get-employees",employee.get)


module.exports = app;