const express = require('express');
const app = express();
const employee = require('../ReqResponseHandler/Employee')

//check token
const checkToken = (req, res, next) => {
    const header = req.headers;
    console.log(header.authorization);
    
    if(typeof header !== 'undefined') {
        const bearer = header.authorization.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

//office employees
app.post("/insert-employees",employee.insert)
app.get("/get-employees",employee.get)

//login
app.post("/login",employee.login);
app.get("/get-login",checkToken,employee.getLogin);

module.exports = app;