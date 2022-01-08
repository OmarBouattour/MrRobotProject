const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose')
const  ls  = require('child_process');
const multer = require('multer');
var fs = require('fs');
//var app = express();
//var expressValidator = require('express-validator');

//app.use(expressValidator());  //this line to be addded

const  Testcase  = require('../modules/testcase');

const db = "mongodb://localhost:27017/testcase"

mongoose.createConnection(db, err =>{
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb test case')      
    }
});
const MIME_TYPES = {
    
    'uploads/robot': 'robot',
    
  };
  
  //var sample = fs.readFileSync('./uploads/TestCase1.robot','utf8');
  //console.log(sample);
  //fs.writeFileSync('output.txt',sample);
  /*let arr = sample.split(/\r?\n/);
  arr.forEach((line, idx)=> {
      if(line.includes("step")){
      console.log(line);
      }
  });
  var content;

  fs.readFile('./uploads/TestCase1.robot', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    let arr = data.split(/\r?\n/);
    arr.forEach((line, idx)=> {
      if(line.includes("step")){
      console.log(line);
      }
});*/


//File Upload
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        -callBack(null, "./uploads/");
        +callBack(null, "uploads/")
    },
    filename: (req, file, callBack) => {
        //callBack(null, `FunOfHeuristic_${file.originalname}`)
        const name = file.originalname
        callBack(null, name); 
    }
})
const upload = multer({ storage : storage}); // or simply { dest: 'uploads/' }

//Display
router.get('/', (req, res) => {
    Testcase.find({},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Test Case :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Modify 
router.get('/modify', (req, res) => {
    Testcase.find({},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Test Case :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/modify/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        console.log(req.query.name)
        var stringifiedArray = JSON.stringify(req.query.name)
        let ss = stringifiedArray.replace(/"/g, '');
        Testcase.find({_id:req.params.id},{upload:1},(err, docs) => {
            if (!err) { console.log(docs); }
            else { console.log('Error in Retriving Test Case :' + JSON.stringify(err, undefined, 2)); }
        });
        //ls.exec('cd ../../pythonProject1/TestCases & notepad '+stringifiedArray, (error, stdout, stderr) => {

        ls.exec('cd ./uploads & notepad '+ stringifiedArray, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            var sample = fs.readFileSync('./uploads/'+ss,'utf8');
    
     
        
            function Filetostring(){ 
                let arr = sample.split(/\r?\n/);
                // Find returns the first element that matches our criteria
                const step = arr.filter((step , idx)=> {
                    if (step.includes("step")) {
                     console.log(step);             //this gives me the first result I need
            
                     return true;
            
                    }
                    return false;
                 }); 
               let stepss = JSON.stringify(step)
               let newString = stepss.replace(/[\[\]\'\s]/g, ' ');
               let newString2 = newString.replace(/"/g, '');
               let newString3 = newString2.replace(/#step/g, '');
               let newString4 = newString3.replace(/,/g, '\n');
        
               return newString4;
             }
                 
             let steps = Filetostring()
             console.log(steps)
             
             Testcase.findByIdAndUpdate(req.params.id, { run: steps }, { new: true }, (err, doc) => {
                if (!err) {  }
                else { console.log('Error in TestCase Update :' + JSON.stringify(err, undefined, 2)); }
            });
          });
          
});

//Run
router.get('/run', (req, res) => {
    Testcase.find({},(err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Test Case :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/run/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
        console.log(req.query.name)
        var stringifiedArray = JSON.stringify(req.query.name)
        const unquoted = JSON.parse(stringifiedArray)
        console.log(JSON.parse(stringifiedArray))
        Testcase.find({_id:req.params.id},{upload:1},(err, docs) => {
            if (!err) { console.log(docs); }
            else { console.log('Error in Retriving Test Case :' + JSON.stringify(err, undefined, 2)); }
        });
        //ls.exec('cd ../../pythonProject1/TestCases & notepad '+stringifiedArray, (error, stdout, stderr) => {
            
        ls.exec('cd ./uploads & robot '+ unquoted +' & ping 127.0.0.1 -n 6 > nul  & rfhistoricparser -o "output.xml" -s "localhost" -u "superuser" -p "passw0rd" -n "MrRobot" -e "Login Admin" ', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
          });
          
});

//Find by id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Testcase.findOne(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Test Case :' + JSON.stringify(err, undefined, 2)); }
    });
});

//Create

router.post('/create',multer({ storage : storage}).any(), (req, res) => {
    const url = req.protocol + '://'+ req.get("host");  
    let userData = req.body
    let testcase = new Testcase(userData)
    var sample = fs.readFileSync('./uploads/'+req.files[0].filename,'utf8');
    
     
        
    function Filetostring(){ 
        let arr = sample.split(/\r?\n/);
        // Find returns the first element that matches our criteria
        const step = arr.filter((step , idx)=> {
            if (step.includes("step")) {
             console.log(step);             //this gives me the first result I need
    
             return true;
    
            }
            return false;
         }); 
       let stepss = JSON.stringify(step)
       let newString = stepss.replace(/[\[\]\'\s]/g, ' ');
       let newString2 = newString.replace(/"/g, '');
       let newString3 = newString2.replace(/#step/g, '');
       let newString4 = newString3.replace(/,/g, '\n');

       return newString4;
     }

     let newName = JSON.stringify(req.files[0].filename)
     let newName1 = newName.replace(/"/g, '');
     let newName2 = newName1.replace(/.robot/g, '');
     let steps = Filetostring()
     console.log(steps)

    
    var tc = new Testcase({
        name: newName2,
        //upload: url + "/uploads/" + req.files[0].filename ,
        upload: req.files[0].filename ,
        
        run : steps,
        
        modify: req.body.modify,
        delete: req.body.delete,
        step1: req.body.step1,
        step2: req.body.step2,
        step3: req.body.step3,
        step4: req.body.step4,
        step5: req.body.step5,
        step6: req.body.step6,
        step7: req.body.step7,
    });
    
    //const file = req.file;
    console.log(req.files[0].filename);
    tc.save((err, doc) => {
        if (err) { res.status(401).send("errorrrrr") }
        else { 
            res.status(200).send(doc)
        }
    });
});

//write test case
router.post('/create2', (req, res) => {

    console.log(req.body.step1)

    var tc = new Testcase({
        name: req.body.name,
        //upload: url + "/uploads/" + req.files[0].filename ,
        upload: req.body.name + ".robot",
        
        run : req.body.run,
        
        modify: req.body.modify,
        delete: req.body.delete,
        step1: req.body.step1,
        step2: fs.writeFile('./uploads/'+req.body.name+'.robot', req.body.step1 , function (err) {
            if (err) throw err;               console.log('Results Received');
          }),
        step3: req.body.step3,
        step4: req.body.step4,
        step5: req.body.step5,
        step6: req.body.step6,
        step7: req.body.step7,
    });
    //console.log(req.body.step1)
    tc.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2)); }
    });
});
//sss
/*
router.post('/create2',multer({ storage : storage}).any(), (req, res) => {
    const url = req.protocol + '://'+ req.get("host");  
    let userData = req.body
    let testcase = new Testcase(userData)
    var tc = new Testcase({
        upload: url + "/uploads/" + req.file.filename ,
        name: req.body.name,

    });
    
    //const file = req.file;
    console.log(req.file.filename);
    tc.save((err, doc) => {
        if (err) { res.status(401).send('deeeeeoc') }
        else { 
            res.status(200).send(doc)
        }
    });
});

*/

//put

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var tc = {
        name: req.body.name,
        upload: req.body.upload,
        run: req.body.run,
        modify: req.body.modify,
        delete: req.body.delete,
        step1: req.body.step1,
        step2: req.body.step2,
        step3: req.body.step3,
        step4: req.body.step4,
        step5: req.body.step5,
        step6: req.body.step6,
        step7: req.body.step7,
    };
    Testcase.findByIdAndUpdate(req.params.id, { $set: tc }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in TestCase Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//archive

router.put('/deleted/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var tc = {
        name: req.body.name,
        upload: req.body.upload,
        run: req.body.run,
        modify: req.body.modify,
        delete: req.body.delete,
        step1: req.body.step1,
        step2: req.body.step2,
        step3: req.body.step3,
        step4: req.body.step4,
        step5: req.body.step5,
        step6: req.body.step6,
        step7: req.body.step7,
    };
    Testcase.findByIdAndUpdate(req.params.id, { delete: 'deleted' }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in TestCase Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//restore

router.put('/restore/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var tc = {
        name: req.body.name,
        upload: req.body.upload,
        run: req.body.run,
        modify: req.body.modify,
        delete: req.body.delete,
        step1: req.body.step1,
        step2: req.body.step2,
        step3: req.body.step3,
        step4: req.body.step4,
        step5: req.body.step5,
        step6: req.body.step6,
        step7: req.body.step7,
    };
    Testcase.findByIdAndUpdate(req.params.id, { delete: '' }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in TestCase Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

//delete

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Testcase.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in TestCase Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});



module.exports = router;