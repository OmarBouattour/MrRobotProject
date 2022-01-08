import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { testcaseService } from '../services/testcase.service';
import { testcase } from '../modules/testcase';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-restoretestcase',
  templateUrl: './restoretestcase.component.html',
  styleUrls: ['./restoretestcase.component.scss']
})
export class RestoretestcaseComponent implements OnInit {
  testcases = []
  specialEvents = []

  constructor(private _eventService: EventService,
    private testcaseService: testcaseService,
    private _router: Router) { }

    ngOnInit(): void {
      this._eventService.getSpecialEvents()
        .subscribe(
          res => this.specialEvents = res,
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                this._router.navigate(['/home'])
              }
            }
          }
        )
      this.testcaseService.getTestCase()
        .subscribe(
          res => this.testcases = res,
          
        )
    }
    
    restoretestcase(id) {
      
  
        this.testcaseService.restoreTestCase(id).subscribe(
          res => {
          console.log(res)
          this._router.navigate(['/admin'])
          setTimeout(() => {
            window.alert('Test Case Restored successfully');
            }, 500);
        },
          err => {
          console.log(err);
          
          
        }
        );
  
      
    }
  

}
