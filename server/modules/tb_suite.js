const db = require('../util/database');


module.exports = class tb_suite {

    
    constructor(Execution_Desc, Suite_Id, Execution_Id,Suite_Name,Suite_Status,Execution_Time,Suite_Total,Suite_Pass,Suite_Fail,Suite_Skip) {
      this.Execution_Desc = Execution_Desc;
      this.Suite_Id = Suite_Id;
      this.Execution_Id = Execution_Id;
      this.Suite_Name = Suite_Name;
      this.Suite_Status = Suite_Status;
      this.Execution_Time = Execution_Time;
      this.Suite_Total = Suite_Total;
      this.Suite_Pass = Suite_Pass;
      this.Suite_Fail = Suite_Fail;
      this.Suite_Skip = Suite_Skip;
    }

    static fetchAll() {
        return db.execute('SELECT `tb_execution`.`Execution_Desc`, `tb_suite`.`Suite_Id`,`tb_suite`.`Execution_Id`,`tb_suite`.`Suite_Name`,`tb_suite`.`Suite_Status`, round(`tb_suite`.`Suite_Time`*60) AS Execution_Time,`tb_suite`.`Suite_Total`,`tb_suite`.`Suite_Pass`,`tb_suite`.`Suite_Fail`,`tb_suite`.`Suite_Skip` FROM `tb_suite` INNER JOIN tb_execution ON `tb_execution`.`Execution_Id`=`tb_suite`.`Execution_Id` ORDER by `tb_suite`.`Suite_Id` DESC        ');
      }
}