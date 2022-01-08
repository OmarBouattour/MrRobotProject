import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { testcaseService } from '../services/testcase.service';
import { testcase } from '../modules/testcase';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { EventService } from '../event.service';

declare var M: any;
@Component({
  selector: 'app-addtestcase',
  templateUrl: './addtestcase.component.html',
  styleUrls: ['./addtestcase.component.scss']
})
export class AddtestcaseComponent implements OnInit {
  addtestcaseData = {'name': '',
  'step1': '',
  
  'modify': '',
  'run': '',
  'delete': '',
  'upload': File = null,
  'step2': '',
  'step3': '',
  'step4': '',
  'step5': '',
  'step6': '',
  'step7':''}
  addtestfileData = {
    
  'upload': File = null,
  }

  TestCaseForm : FormGroup;
  name: ''
  step1: ''
  
  modify: ''
  run: ''
  delete: ''
  upload: File = null
  step2: ''
  step3: ''
  step4: ''
  step5: ''
  step6: ''
  step7:''
  isLoadingResults = false;

  specialEvents = [];
  tfs = [];
  constructor(private testcaseService: testcaseService,
    private _eventService: EventService,
    private _router: Router) { }

  ngOnInit(): void {
    this.testcaseService.gettfs()
      .subscribe(
        res => this.tfs = res,
        
      )

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
  }

  addtestcase(){
    this.testcaseService.postTestCase(this.addtestcaseData,this.addtestcaseData.upload)
    .subscribe(
      res => {
        console.log(res)
        this._router.navigate(['/admin'])
        setTimeout(() => {
          window.alert('Test Case Uploaded successfully');
          }, 500);
      },
      err => {
        console.log(err);
        
        
      }
    )     
  };
  addfile(){
    this.testcaseService.postFile(this.addtestfileData.upload/*,this.addtestcaseData.upload*/)
    .subscribe(
      res => {
        console.log(res)
        //this._router.navigate(['/admin'])
      },
      err => {
        console.log(err);
        
        
      }
    )     
  };
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.addtestcaseData.upload = files.item(0);
  }
  images;
  /*onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.testcaseService.postTestCase(form.value).subscribe((res) => {
        
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
        this._router.navigate(['/admin'])
      });
    }
    
  }*/

  onSubmit(): void {
    this.testcaseService.postFile( this.TestCaseForm.get('upload').value._files[0])
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        if (res.body) {
          this._router.navigate(['/admin', res.body._id]);
        }
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
