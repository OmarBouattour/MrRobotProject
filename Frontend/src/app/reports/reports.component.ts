import { Component, OnInit } from '@angular/core';
import { lastexecutionService } from '../services/lastexecution.service'
import { tbtestService } from '../services/tb_test.service'
import { tbexecutionService } from '../services/tb_execution.service'
import { tbexecutionsortService } from '../services/tb_executionsort.service.'
import { tbsuiteService } from '../services/tb_suite.service'
import { tbsuitecountService } from '../services/tb_suitecount.service'

import { Observable } from "rxjs";
import { tb_test } from "src/app/modules/tb_test";
import { tap } from "rxjs/operators";
import { ChartType ,ChartDataSets, ChartOptions} from 'chart.js';
import { MultiDataSet, Label ,Color} from 'ng2-charts';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  lastexecution= [];
  tb_test=[];
  tb_executions= [];
  tb_executionssort= [];
  tb_suites=[];
  tb_suitescount= [];

  doughnutChartLabels: Label[] = ['Fail %', 'Pass %', 'Skip %'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  
  doughnutChartColors: Color[] = [
    {
      backgroundColor: ['#F7464A', '#48bf46', '#FDB45C']
    }
  ];
  

  doughnutChartType: ChartType = 'doughnut';
  constructor(private lastexecutionService: lastexecutionService,
    private tbexecutionService: tbexecutionService,
    private tbsuiteService: tbsuiteService,
    private tbsuitesortService: tbexecutionService,
    private tbexecutionsortService: tbexecutionsortService,
    private tbsuitescountService: tbsuitecountService,
    private tbtestService: tbtestService) { }

  

  ngOnInit(): void {
    this.tbsuitescountService.fetchAll()
      .subscribe(
        res => this.tb_suitescount = res,
        
      )
    this.lastexecutionService.fetchAll()
      .subscribe(
        res => this.lastexecution = res,
        
      )
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
        res => this.tb_test = res,
        
      )
    this.tbexecutionsortService.fetchAll()
      .subscribe(
        res => this.tb_executionssort = res,
        
      )
  }
  aa = [85, 6, 78, 75, 77, 75]
  public  ChartDataSets : Array<any> = [
    { data: this.aa, label: 'Crude oil prices' },
  ];
  x = this.tb_suitescount.length

  lineChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Last 10 Executions time (seconds)',
      fullSize :true,
      fontSize: 14
      },
    
      
      legend :{
        display: false,
        labels: 'aaaaa'
      },
      scales: {
        yAxes: [
         {
          display: true,
          scaleLabel: {
           display: true,
           labelString: "Execution Time (seconds)",
          },
         },
        ],
        xAxes: [
         {
          scaleLabel: {
           display: true,
           labelString: "Execution Number",
          },
         },
        ],
       },
      

  };
  lineChartOptions2 = {
    responsive: true,
    title: {
      display: true,
      text: 'TestCase per Executions percentage',
      fullSize :true,
      fontSize: 14
      },
    
      
      legend :{
        display: false,
        labels: 'aaaaa'
      },
      
      scales: {
        yAxes: [
         {
          display: true,
          scaleLabel: {
           display: true,
           labelString: "TestCase per Executions (%)",
          },
         },
        ],
        xAxes: [
         {
          scaleLabel: {
           display: true,
           labelString: "Execution Number",
          },
         },
        ],
       },
      
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];
  lineChartColors2: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(120, 120, 120,0.28)',
    },
  ];
  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  lineChartLabel: Label[] = ['Time'];
  lineChartLabel2: Label[] = ['%'];
  //line execution time

  //bar execution pass
  barChartOptions = {
    responsive: true,
    
    datasets: {
      label: 'My First Dataset',
    },
    title: {
      display: true,
      text: 'Last 10 Executions Results',
      fullSize :true,
      fontSize: 14
      },
      scales: {
        yAxes: [
         {
          display: true,
          scaleLabel: {
           display: true,
           labelString: "Pass/Fail/Skip times",
          },
         },
        ],
        xAxes: [
         {
          scaleLabel: {
           display: true,
           labelString: "Execution Number",
          },
         },
        ],
       },
  };
  barChartOptions2 = {
    responsive: true,
    
    datasets: {
      label: 'My First Dataset',
    },
    title: {
      display: true,
      text: 'Test Cases execution count',
      fullSize :true,
      fontSize: 14
      },
  };

  barChartLabels: Label[] = ['Pass', 'Fail', 'Skip'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartLabels2: Label[] = ['Pass', 'Fail', 'Skip'];
  barChartType2: ChartType = 'bar';
  barChartLegend2 = true;
  barChartPlugins2 = [];
   


  barChartColors: Color[] = [
    {
      backgroundColor: ['#F7464A', '#48bf46', '#FDB45C']
    }
  ];
  barChartOptions3 = {
    responsive: true,
    
    datasets: {
      label: 'My First Dataset',
    },
    title: {
      display: true,
      text: 'Last 10 Executions time (seconds)',
      fullSize :true,
      fontSize: 14
      },
      scales: {
        yAxes: [
         {
          display: true,
          scaleLabel: {
           display: true,
           labelString: "Execution Time (seconds)",
          },
         },
        ],
        xAxes: [
         {
          scaleLabel: {
           display: true,
           labelString: "Execution Number",
          },
         },
        ],
       },
  };

  barChartOptions4 = {
    responsive: true,
    
    datasets: {
      label: 'My First Dataset',
    },
    title: {
      display: true,
      text: 'Test Case per Execution Percentage',
      fullSize :true,
      fontSize: 14
      },
      scales: {
        yAxes: [
         {
          display: true,
          scaleLabel: {
           display: true,
           labelString: "Test Case per Execution (%)",
          },
         },
        ],
        xAxes: [
         {
          scaleLabel: {
           display: true,
           labelString: "Execution Number",
          },
         },
        ],
       },
  };

}
