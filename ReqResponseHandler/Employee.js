const mongoose = require('mongoose')
const Employee = require('../Models/Employee')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//insert one employee
module.exports.insert = (req,res) => {
    const {username,fullname,email,mobilenumber,password,roles} = req.body;
    let uName = "",Email = "",mNumber = "";
    Employee.findOne(
        { $or: [{ username:username }, { email: email }, { mobilenumber: mobilenumber }]},
        function(err,doc){
            if(doc){
                doc.username == username ? uName=username : uName="";
                doc.email == email ? Email = email : Email="";
                doc.mobilenumber == mobilenumber ? mNumber=mobilenumber : mNumber=""; 
                console.log(`${uName} ${Email} ${mNumber} is already taken`);
                res.send({"message":"error","username":uName,"email":Email,"mobilenumber":mNumber})
            }
            else
            {
                bcrypt.hash(password, 10, function(err, hash) {
                    const employee = new Employee({
                        username,
                        fullname,
                        email,
                        mobilenumber,
                        password:hash,
                        roles,
                        dateinmillisec:Date.now()
                    })
                    employee.save().then(()=>res.send({"message":"success"}));
                });
            }
        }
    )
    
}

//get all employees
module.exports.get = (req,res) => {
    Employee.find()
    .then(result => res.send(result))
    .catch(err => console.log(err));
}

//login employee
module.exports.login = (req,res) => {
    const {username,password} = req.body;
    let myUser;
    Employee.findOne({username:username})
    .then((user)=>{
        if(user)
        {
            myUser = user;
            bcrypt.compare(password,user.password).then(isEqual => {
                if(isEqual)
                {
                    const token = jwt.sign(
                        {
                            email:myUser.email,
                            userId:myUser._id.toString()
                        },
                        'ednu454@%kljfdlfbBKJGGKFJN',
                        {expiresIn:'1h'}
                    );
                    res.send({"message":"Logged in successfully","type":"success","token":token,"user":myUser.roles});
                }
                else
                {
                    res.send({"message":"Incorrect username or password","type":"error"});
                }
            })
        }
        else
        {   
            res.send({"message":"Incorrect username or password","type":"error"});
        }
    })
    .catch(err => console.log(err));
}

module.exports.getLogin = (req,res)=>{
    console.log(req.token);
    const decode = jwt.verify(req.token, 'ednu454@%kljfdlfbBKJGGKFJN');
    const userId = decode.userId;
    Employee.findOne({_id:userId},function(err,user){
        res.send({"user":user.roles});
    })
}
