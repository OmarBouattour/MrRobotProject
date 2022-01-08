import { Component, OnInit , TemplateRef} from '@angular/core';
import { tbexecutionService } from '../services/tb_execution.service'
import { tbtestService } from '../services/tb_test.service'
import { tbsuitesortService } from '../services/tb_suitesort.service'

import { tbexecutionsortService } from '../services/tb_executionsort.service.'
import { tbsuitecountService } from '../services/tb_suitecount.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { tbsuiteService } from '../services/tb_suite.service'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  tb_executions= [];
  tb_tests= [];
  tb_executionssort= [];
  tb_suitescount= [];
  constructor(private tbexecutionService: tbexecutionService,
    private tbexecutionsortService: tbexecutionsortService,
    private tbtestService: tbtestService,
    private tbsuiteService: tbsuiteService,
    private tbsuitesortService: tbsuitesortService,
    private tbsuitescountService: tbsuitecountService,
    private modalService: BsModalService) { }
  
  ngOnInit(): void {
    this.tbsuiteService.fetchAll()
      .subscribe(
        res => this.tb_executions = res,
        
      )
    this.tbsuitescountService.fetchAll()
      .subscribe(
        res => this.tb_suitescount = res,
        
      )
    this.tbtestService.fetchAll()
      .subscribe(
        res => this.tb_tests = res,
        
      )
    this.tbsuitesortService.fetchAll()
      .subscribe(
        res => this.tb_executionssort = res,
        
      )
  }

  modalRef: BsModalRef;

  //totalTasks = this.tb_suitescount.length;
  currentListe;
  showModal: boolean = false;
  voirIndexDevis(liste) {
    this.currentListe = liste;
    this.showModal = true;
  }
  hideModal() {
    this.showModal = false;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
