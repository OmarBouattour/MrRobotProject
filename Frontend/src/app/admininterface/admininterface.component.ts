import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { testcaseService } from '../services/testcase.service';
import { testcase } from '../modules/testcase';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admininterface',
  templateUrl: './admininterface.component.html',
  styleUrls: ['./admininterface.component.scss']
})
export class AdmininterfaceComponent implements OnInit {
  testcases = []
  specialEvents = []
  deletetestcaseData = {
  }
  constructor(private _eventService: EventService,
    private testcaseService: testcaseService,
    private _router: Router) { }


    getConcatString() { 
      return this.testcases
                .filter(x => x.checked)
                .map(x => x.upload)
                .join(' ')
      
  }
  ngOnInit(): void {
    this.fetchSelectedItems()
    this.fetchCheckedIDs()
      this.fetchCheckedUpload()

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
  
  deletetestcase(id) {
    
      this.testcaseService.deleteTestCase(id).subscribe(
        res => {
        console.log(res)
        window.alert('Test Case Archived successfully');
        window.location.reload();
        
          
          

      },
        err => {
        console.log(err);
      }
      );

    
  }

click1(){
  console.log(this.getConcatString)
}
selectedItemsList = [];
checkedIDs = [];
checkedUploads = [];

checked() {
  return this.testcases .filter(x => x.checked)
                              .map(x => x.upload)
                              
                              .join(' ')
}

changeSelection() {
  this.fetchSelectedItems();
  this.fetchCheckedIDs();
  this.fetchCheckedUpload()

}

fetchSelectedItems() {
  this.selectedItemsList = this.testcases.filter((value, index) => {
    return value.checked
  })
  
}

fetchCheckedUpload() {
  this.checkedUploads = []
  this.testcases.forEach((value, index) => {
    if (value.checked) {
      this.checkedUploads.push(value.upload);
    }
  });
}

fetchCheckedIDs() {
  this.checkedIDs = []
  this.testcases.forEach((value, index) => {
    if (value.checked) {
      this.checkedIDs.push(value._id);
    }
  });
}
str = this.checkedUploads.join(); 
selectedAll: any;

selectAll() {
    for (var i = 0; i < this.testcases.length; i++) {
      this.testcases[i].checked = this.selectedAll;
    }
    this.fetchSelectedItems();
  this.fetchCheckedIDs();
  this.fetchCheckedUpload()
  }
  public removeSlashes(side: string): string {
    return side.replace(/,/g, "\n");
}


}
