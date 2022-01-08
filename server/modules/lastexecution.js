const db = require('../util/database');


module.exports = class lastexecution {

    
    constructor( Execution_Id, Execution_Date,Execution_Desc,Execution_Total,Execution_Pass,Execution_Fail,Execution_Skip,Execution_Passp,Execution_Failp,Execution_Skipp,Execution_Time) {
      
      this.Execution_Id = Execution_Id;
      this.Execution_Date = Execution_Date;
      this.Execution_Desc = Execution_Desc;
      this.Execution_Total = Execution_Total;
      this.Execution_Pass = Execution_Pass;
      this.Execution_Fail = Execution_Fail;
      this.Execution_Skip = Execution_Skip;
      this.Execution_Passp = Execution_Passp;
      this.Execution_Failp = Execution_Failp;
      this.Execution_Skipp = Execution_Skipp;
      this.Execution_Time = Execution_Time;
    }

    static fetchAll() {
        return db.execute('SELECT Execution_Id,Execution_Pass,Execution_Fail,Execution_Skip,CAST(Execution_Date AS CHAR(19)) AS Execution_Date,Execution_Desc,Execution_Total,cast(Execution_Pass/Execution_Total*100 as decimal(10,2)) as Execution_Passp,cast(Execution_Fail/Execution_Total*100 as decimal(10,2)) as Execution_Failp,cast(Execution_Skip/Execution_Total*100 as decimal(10,2)) as Execution_Skipp,cast(Execution_Time as decimal(10,1)) AS Execution_Time FROM `tb_execution` WHERE Execution_Id=(SELECT MAX(Execution_Id) FROM `tb_execution`)        ');
      }
      //SELECT MAX(Execution_Id) AS Execution_Id,CAST(Execution_Date AS CHAR(19)) AS Execution_Date,Execution_Desc,Execution_Total,Execution_Pass,Execution_Fail,Execution_Skip,cast(Execution_Time as decimal(10,1)) AS Execution_Time FROM `tb_execution` ORDER BY `tb_execution`.`Execution_Date` DESC

}