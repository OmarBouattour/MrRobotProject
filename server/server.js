const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var mysql = require('mysql');

const executionRoutes = require('./routes/tb_execution');
const testRoutes = require('./routes/tb_test');
const lastexecutionRoutes = require('./routes/lastexecution');
const executionsortRoutes = require('./routes/tb_executionSort');
const suiteRoutes = require('./routes/tb_suite');
const suitesortRoutes = require('./routes/tb_suitesort');
const suitecountRoutes = require('./routes/tb_suitecount');
const errorController = require('./controllers/error');

const PORT = 5555
const api = require('./routes/api')
const testcase = require('./routes/testcase')
const app = express()

app.use(cors())
app.use( bodyParser.json())
app.use('/api', api)
app.use('/testcase', testcase)


//mysql
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/tests', testRoutes);
app.use('/executions', executionRoutes);
app.use('/lastexecution', lastexecutionRoutes);
app.use('/executionsort', executionsortRoutes);
app.use('/suites', suiteRoutes);
app.use('/suitessort', suitesortRoutes);
app.use('/suitescount', suitecountRoutes);

app.use(errorController.get404);

app.use(errorController.get500);


var con = mysql.createConnection({
    host: "localhost",
    user: "superuser",
    password: "passw0rd",
    database: "mrrobot"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT Test_Id, Test_Name FROM tb_test", function (err, result, fields) {
      if (err) throw err;
      console.log('hey');
    });
  });
//mysql
  
app.get('/' , function(req,res){
    res.send('hello from admin' )
})

app.listen(PORT,function(){
    console.log('admin running on localhost:' + PORT)
})


