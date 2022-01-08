import { Component, OnInit, TemplateRef } from '@angular/core';
import { tbexecutionService } from '../services/tb_execution.service'
import { tbtestService } from '../services/tb_test.service'
import { tbexecutionsortService } from '../services/tb_executionsort.service.'
import { tbsuiteService } from '../services/tb_suite.service'
import { tbsuitesortService } from '../services/tb_suitesort.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChartType ,ChartDataSets, ChartOptions} from 'chart.js';
import { MultiDataSet, Label ,Color} from 'ng2-charts';
import { tbsuitecountService } from '../services/tb_suitecount.service'


@Component({
  selector: 'app-executions',
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent implements OnInit {
  tb_executions= [];
  tb_tests= [];
  tb_executionssort= [];
  tb_suites=[];
  tb_suitescount= [];

  modalRef: BsModalRef;
  pageOfItems: Array<any>;

   i=0;
   increment_property(): void{
    this.i++;
  }
  totalTasks = this.tb_executions.length;
  currentListe;
  showModal: boolean = false;
  currentListe2;
  showModal2: boolean = false;
  voirIndexDevis(liste) {
    this.currentListe = liste;
    this.showModal = true;
  }
  voirIndexDevis2(liste) {
    this.currentListe2 = liste;
    this.showModal2 = true;
  }
  hideModal() {
    this.showModal = false;
  }

  constructor(private tbexecutionService: tbexecutionService,
    private tbsuiteService: tbsuiteService,
    private tbsuitesortService: tbexecutionService,
    private tbexecutionsortService: tbexecutionsortService,
    private tbtestService: tbtestService,    
    private tbsuitescountService: tbsuitecountService,
    private modalService: BsModalService) { }


    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
    onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }
  ngOnInit(): void {

    this.tbsuitescountService.fetchAll()
      .subscribe(
        res => this.tb_suitescount = res,
        
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
        res => this.tb_tests = res,
        
      )
    this.tbexecutionsortService.fetchAll()
      .subscribe(
        res => this.tb_executionssort = res,
        
      )
  }

  doughnutChartLabels: Label[] = ['Fail ', 'Pass ', 'Skip '];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  
  doughnutChartColors: Color[] = [
    {
      backgroundColor: ['#F7464A', '#48bf46', '#FDB45C']
    }
  ];
  

  doughnutChartType: ChartType = 'doughnut';

}
