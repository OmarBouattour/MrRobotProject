import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { testcaseService } from '../services/testcase.service';

@Component({
  selector: 'app-userinterface',
  templateUrl: './userinterface.component.html',
  styleUrls: ['./userinterface.component.scss']
})
export class UserinterfaceComponent implements OnInit {
  testcases = []
  events = []
  constructor(private _eventService: EventService,
    private testcaseService: testcaseService,) { }

  ngOnInit(): void {
    this._eventService.getEvents()
    .subscribe(
      res => this.events = res,
      err => console.log(err)
    )
    this.testcaseService.getTestCase()
      .subscribe(
        res => this.testcases = res,
        
      )
  }

}
