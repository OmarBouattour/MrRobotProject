import { Component, OnInit , ViewChild, AfterViewInit} from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { testcaseService } from '../services/testcase.service';
import { EventService } from '../event.service';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-writetest',
  templateUrl: './writetest.component.html',
  styleUrls: ['./writetest.component.scss']
})
export class WritetestComponent implements OnInit {
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
  writetestcaseData = {'name': '',
  'step1': '',
  
  'modify': '',
  'run': '',
  'delete': '',
  'upload': '',
  'step2': '',
  'step3': '',
  'step4': '',
  'step5': '',
  'step6': '',
  'step7':''}
  addtestfileData = {
    
    'upload': File = null,
    }
  specialEvents = []
  constructor(private _httpClient: HttpClient, 
    private _FileSaverService: FileSaverService,
    private testcaseService: testcaseService,
    private _eventService: EventService,
    private _router: Router
    ) { }
  
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

  }
  
  addtestcase(){
    this.testcaseService.postTestCase(this.addtestcaseData,this.addtestcaseData.upload)
    .subscribe(
      res => {
        console.log(res)
        this._router.navigate(['/admin'])
        setTimeout(() => {
          window.alert('Test Case added successfully');
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

 
 

  
  public name=""
  public text ="";
  public fileName: string;
  onDown(type: string, fromRemote: boolean) {
    const fileName = `${this.name}.${type}`;
    if (fromRemote) {
      this._httpClient.get(`../../../../server/uploads/demo.${type}`, {
        observe: 'response',
        responseType: 'blob'
      }).subscribe(res => {
        this._FileSaverService.save(res.body, fileName);
      });
      return;
    }
    const fileType = this._FileSaverService.genType(fileName);
    const txtBlob = new Blob([this.text], { type: fileType });
    this._FileSaverService.save(txtBlob, fileName);
  }

  
  writetestcase(){
    this.testcaseService.writeTestCase(this.writetestcaseData)
    .subscribe(
      res => {
        console.log(res)
        this._router.navigate(['/admin'])
      },
      err => {
        console.log(err);
        
        
      }
    )     
  };
  codeMirrorOptions: any = {
    theme: 'idea',
    mode: 'python',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true
  };
}
