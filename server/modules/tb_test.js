const db = require('../util/database');


module.exports = class tb_test {

    
    constructor(Test_Id, Execution_Id, Test_Name,Test_Status,Test_Error) {
      this.Test_Id = Test_Id;
      this.Execution_Id = Execution_Id;
      this.Test_Name = Test_Name;
      this.Test_Status = Test_Status;
      this.Test_Error = Test_Error;
    }

    static fetchAll() {
        return db.execute('SELECT * FROM tb_test ORDER BY `tb_test`.`Test_Id` DESC');
      }
}