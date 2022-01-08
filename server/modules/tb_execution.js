const db = require('../util/database');


module.exports = class tb_execution {

    
    constructor( Execution_Id, Execution_Date,Execution_Desc,Execution_Total,Execution_Pass,Execution_Fail,Execution_Skip,Execution_Time) {
      
      this.Execution_Id = Execution_Id;
      this.Execution_Count = Execution_Count;
      this.Execution_Date = Execution_Date;
      this.Execution_Desc = Execution_Desc;
      this.Execution_Total = Execution_Total;
      this.Execution_Pass = Execution_Pass;
      this.Execution_Fail = Execution_Fail;
      this.Execution_Skip = Execution_Skip;
      this.Execution_Time = Execution_Time;
    }

    static fetchAll() {
        return db.execute('SELECT a.Execution_Id,b.Execution_count,CAST(a.Execution_Date AS CHAR(19)) AS Execution_Date,a.Execution_Desc,a.Execution_Total,a.Execution_Pass,a.Execution_Fail,a.Execution_Skip,cast(a.Execution_Time as decimal(10,1)) AS Execution_Time FROM tb_execution a join (select Execution_Id, count(*) as Execution_count from tb_suite group by Execution_Id) b on a.Execution_Id = b.Execution_Id ORDER BY a.`Execution_Date` DESC        ');
      }
      //SELECT MAX(Execution_Id) AS Execution_Id,CAST(Execution_Date AS CHAR(19)) AS Execution_Date,Execution_Desc,Execution_Total,Execution_Pass,Execution_Fail,Execution_Skip,cast(Execution_Time as decimal(10,1)) AS Execution_Time FROM `tb_execution` ORDER BY `tb_execution`.`Execution_Date` DESC
      //SELECT a.Execution_Id,b.Execution_count,CAST(a.Execution_Date AS CHAR(19)) AS Execution_Date,a.Execution_Desc,a.Execution_Total,a.Execution_Pass,a.Execution_Fail,a.Execution_Skip,cast(a.Execution_Time as decimal(10,1)) AS Execution_Time FROM tb_execution a join (select Execution_Id, count(*) as Execution_count from tb_suite group by Execution_Id) b on a.Execution_Id = b.Execution_Id ORDER BY a.`Execution_Date` DESC
      //SELECT Execution_Id,CAST(Execution_Date AS  CHAR(19)) AS Execution_Date,Execution_Desc,Execution_Total,Execution_Pass,Execution_Fail,Execution_Skip,cast(Execution_Time as decimal(10,1)) AS Execution_Time FROM `tb_execution` ORDER BY `tb_execution`.`Execution_Date` DESC        
//new one
//SELECT DISTINCT a.`Suite_Name`,b.`Execution_count` FROM `tb_suite` a join (select Suite_Name, count(*) as Execution_count from tb_suite group by Suite_Name) b on a.Suite_Name = b.Suite_Name ORDER BY a.`Suite_Name` ASC



    }