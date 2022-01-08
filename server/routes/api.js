//packages
const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../modules/user');
const router = express.Router()
const mongoose = require('mongoose')
const  ls  = require('child_process');
const app = express()
mongoose.set('useCreateIndex', true);

//mongo db connection:
const db = "mongodb://localhost:27017/users"

mongoose.connect(db, err =>{
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

const checkRole = roles => (req, res, next) =>{
  let userData = req.body
    let user = new User(userData)
  if (!roles.includes(userData.role)) {
    return next();
  }
   res.status(401).json("Unauthorized")
    
}
  

app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  /*
  req.user = payload.user;
  // Fetch the user by id 
  User.findOne({email: req.user.email}).then(function(user){
    if (req.user.role !== 'admin'){
      return res.status(401).send('Unauthorized request')  
    }
  });
  
  

  let userData = req.body
    let user = new User(userData)
  if (userData.role == (["reader"])){
    return res.status(401).send('Unauthorized request')  
  }
  
  User.findOne({role: userData.role}, (err, user) => {
    if (userData.role == "reader"){
      return res.status(401).send('Unauthorized request')  
    }
  })*/
  
  req.userId = payload.subject
  req.role = payload.subject
  if (req.role !== 'admin'){
    return res.status(401).send('Unauthorized request')  
  }
  next()
}




function authRole(req, res, next) {
  let token = req.headers.authorization.split(' ')[1]
  let payload = jwt.verify(token, 'secretKey')
  let userData = req.body
  if (userData.role == 'admin'){
    return res.status(401).send('Unauthorized request')  
  }
    

    next()
  
}

router.get('/', (req, res) => {
    res.send('from API route')
})


router.post('/register',verifyToken, (req, res) =>{
    let userData = req.body
    let user = new User(userData)
    if (req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == "" || req.body.role == null || req.body.role == ""){
      res.status(401).send("Make sure Email and Password are provided and Role") 
    }
    
    else {
      user.save((err, registeredUser) => {
          
          if (err) {
            res.status(401).send("Email already used or Role not provided")      
          } else {
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
          }
      })
    }
})

router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Username')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          
          let payload = {subject: user._id,subject: user.role}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
          

        }
      }
    })
  })

  
  
  
  router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Check Login for Admin",
        "description": "Open Browser || Maximise the Window || Fill the Admin credentials || Press Login || Wait for redirection || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the Admin credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Close Browser",
        "test": "http://localhost:5555/api/test"
      },
      {
        "_id": "2",
        "name": "Check Login for User",
        "description": "Open Browser || Maximise the Window || Fill the User credentials || Press Login || Wait for redirection || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the User credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Close Browser",
      },
      {
        "_id": "3",
        "name": "Check Login failure",
        "description": "Open Browser || Maximise the Window || Fill the Wrong User credentials || Press Login || Wait for error message || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the Wrong User credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for the Error Message",
        "Step6": "Step 6: Close Browser",
      },
      {
        "_id": "4",
        "name": "Check Menu for Admin",
        "description": "Open Browser || Maximise the Window || Fill the Admin credentials || Press Login || Wait for redirection || Check all the Admin Menu buttons || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the Admin credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Check all the Admin Menu buttons",
        "Step7": "Step 7: Close Browser",
      },
      {
        "_id": "5",
        "name": "Check Menu for User",
        "description": "Open Browser || Maximise the Window || Fill the User credentials || Press Login || Wait for redirection || Check all the User Menu buttons || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the User credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Check all the User Menu buttons",
        "Step7": "Step 7: Close Browser",
      },
      {
        "_id": "6",
        "name": "Admin Test Case6",
        "description": "Steps1 Step2 Step3",
      }

    ]
    res.json(events)
  })
  
router.get('/special', verifyToken, (req,res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Check Login for Admin",
        "description": "Open Browser || Maximise the Window || Fill the Admin credentials || Press Login || Wait for redirection || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the Admin credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Close Browser",
        "test": "http://localhost:5555/api/LoginAdmin"
      },
      {
        "_id": "2",
        "name": "Check Login for User",
        "description": "Open Browser || Maximise the Window || Fill the User credentials || Press Login || Wait for redirection || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the User credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Close Browser",
        "test": "http://localhost:5555/api/LoginReader"
      },
      {
        "_id": "3",
        "name": "Check Login failure",
        "description": "Open Browser || Maximise the Window || Fill the Wrong User credentials || Press Login || Wait for error message || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the Wrong User credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for the Error Message",
        "Step6": "Step 6: Close Browser",
        "test": "http://localhost:5555/api/LoginFailure"
      },
      {
        "_id": "4",
        "name": "Check Menu for Admin",
        "description": "Open Browser || Maximise the Window || Fill the Admin credentials || Press Login || Wait for redirection || Check all the Admin Menu buttons || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the Admin credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Check all the Admin Menu buttons",
        "Step7": "Step 7: Close Browser",
        "test": "http://localhost:5555/api/CheckMenuAdmin"
      },
      {
        "_id": "5",
        "name": "Check Menu for User",
        "description": "Open Browser || Maximise the Window || Fill the User credentials || Press Login || Wait for redirection || Check all the User Menu buttons || Close Browser",
        "Step1": "Step 1: Open Browser",
        "Step2": "Step 2: Maximise the Window",
        "Step3": "Step 3: Fill the User credentials",
        "Step4": "Step 4: Press Login",
        "Step5": "Step 5: Wait for redirection",
        "Step6": "Step 6: Check all the User Menu buttons",
        "Step7": "Step 7: Close Browser",
        "test": "http://localhost:5555/api/CheckMenuReader"
      },
      {
        "_id": "6",
        "name": "Admin Test Case6",
        "description": "Steps1 Step2 Step3",
      }
    ]
    res.json(specialEvents)
  })


//Jupyter
router.get('/jupyter', (req, res) => {
  
  ls.exec('cd ../../jupyter & jupyter notebook', (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    res.send(`stdout: ${stdout}`);
  });
    
})

//CheckMenuAdmin
router.get('/70155f', function (req, res) {
  var spawn = require("child_process").spawn,child;
  child = spawn("powershell.exe",["./TFS/CheckMenuAdminFail.ps1"]);
  child.stdout.on("data",function(data){
      console.log("Powershell Data: " + data);
  });
  child.stderr.on("data",function(data){
      console.log("Powershell Errors: " + data);
  });
  child.on("exit",function(){
      console.log("Powershell Script finished");
  });
  child.stdin.end(); //end input
    })


  router.get('/70155p', function (req, res) {
      var spawn = require("child_process").spawn,child;
      child = spawn("powershell.exe",["./TFS/CheckMenuAdminPass.ps1"]);
      child.stdout.on("data",function(data){
          console.log("Powershell Data: " + data);
      });
      child.stderr.on("data",function(data){
          console.log("Powershell Errors: " + data);
      });
      child.on("exit",function(){
          console.log("Powershell Script finished");
      });
      child.stdin.end(); //end input
        })

//CheckMenuReader
  router.get('/70156f', function (req, res) {
      var spawn = require("child_process").spawn,child;
      child = spawn("powershell.exe",["./TFS/CheckMenuReaderFail.ps1"]);
      child.stdout.on("data",function(data){
          console.log("Powershell Data: " + data);
      });
      child.stderr.on("data",function(data){
          console.log("Powershell Errors: " + data);
      });
      child.on("exit",function(){
          console.log("Powershell Script finished");
      });
      child.stdin.end(); //end input
        })


    router.get('/70156p', function (req, res) {
          var spawn = require("child_process").spawn,child;
          child = spawn("powershell.exe",["./TFS/CheckMenuReaderFail.ps1"]);
          child.stdout.on("data",function(data){
              console.log("Powershell Data: " + data);
          });
          child.stderr.on("data",function(data){
              console.log("Powershell Errors: " + data);
          });
          child.on("exit",function(){
              console.log("Powershell Script finished");
          });
          child.stdin.end(); //end input
            })

        //login admin
  router.get('/70157f', function (req, res) {
            var spawn = require("child_process").spawn,child;
            child = spawn("powershell.exe",["./TFS/LoginAdminFail.ps1"]);
            child.stdout.on("data",function(data){
                  console.log("Powershell Data: " + data);
              });
            child.stderr.on("data",function(data){
                console.log("Powershell Errors: " + data);
             });
             child.on("exit",function(){
                console.log("Powershell Script finished");
             });
             child.stdin.end(); //end input
               })



router.get('/70157p', function (req, res) {
          var spawn = require("child_process").spawn,child;
          child = spawn("powershell.exe",["./TFS/LoginAdminPass.ps1"]);
          child.stdout.on("data",function(data){
              console.log("Powershell Data: " + data);
          });
          child.stderr.on("data",function(data){
              console.log("Powershell Errors: " + data);
          });
          child.on("exit",function(){
              console.log("Powershell Script finished");
          });
          child.stdin.end(); //end input
            });

  // login failure

router.get('/70158f', function (req, res) {
          var spawn = require("child_process").spawn,child;
          child = spawn("powershell.exe",["./TFS/LoginFailureFail.ps1"]);
          child.stdout.on("data",function(data){
              console.log("Powershell Data: " + data);
          });
          child.stderr.on("data",function(data){
              console.log("Powershell Errors: " + data);
          });
          child.on("exit",function(){
              console.log("Powershell Script finished");
          });
          child.stdin.end(); //end input
            });

  router.get('/70158p', function (req, res) {
          var spawn = require("child_process").spawn,child;
          child = spawn("powershell.exe",["./TFS/LoginFailurePass.ps1"]);
          child.stdout.on("data",function(data){
              console.log("Powershell Data: " + data);
          });
          child.stderr.on("data",function(data){
              console.log("Powershell Errors: " + data);
          });
          child.on("exit",function(){
              console.log("Powershell Script finished");
          });
          child.stdin.end(); //end input
            });          
module.exports = router;