import { Component, OnInit } from '@angular/core';
import { tbexecutionService } from '../services/tb_execution.service'
import { tbtestService } from '../services/tb_test.service'
import { tbexecutionsortService } from '../services/tb_executionsort.service.'
import { tbsuiteService } from '../services/tb_suite.service'
import { tbsuitesortService } from '../services/tb_suitesort.service'

@Component({
  selector: 'app-allstats',
  templateUrl: './allstats.component.html',
  styleUrls: ['./allstats.component.scss']
})
export class AllstatsComponent implements OnInit {

  tb_executions= [];
  tb_tests= [];
  tb_executionssort= [];
  tb_suites=[];
   i=0;
   increment_property(): void{
    this.i++;
  }
  totalTasks = this.tb_executions.length;

  constructor(private tbexecutionService: tbexecutionService,
    private tbsuiteService: tbsuiteService,
    private tbsuitesortService: tbexecutionService,
    private tbexecutionsortService: tbexecutionsortService,
    private tbtestService: tbtestService,) { }

  ngOnInit(): void {
    this.tbexecutionService.fetchAll()
      .subscribe(
        res => this.tb_executions = res,
        
      )
      this.tbsuiteService.fetchAll()
      .subscribe(
        res => this.tb_suites = res,
        
      )
    this.tbtestService.fetchAll()
      .subscribe(
        res => this.tb_tests = res,
        
      )
    this.tbexecutionsortService.fetchAll()
      .subscribe(
        res => this.tb_executionssort = res,
        
      )
  }


}
