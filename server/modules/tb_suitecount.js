const db = require('../util/database');


module.exports = class tb_suitcount {

    
    constructor(Suite_Name,Execution_count) {
      this.Suite_Name = Suite_Name;
      this.Execution_count = Execution_count;
      
    }

    static fetchAll() {
        return db.execute('SELECT DISTINCT a.`Suite_Name`,b.`Execution_count` FROM `tb_suite` a join (select Suite_Name, count(*) as Execution_count from tb_suite group by Suite_Name) b on a.Suite_Name = b.Suite_Name ORDER BY a.`Suite_Name` ASC');
      }
}