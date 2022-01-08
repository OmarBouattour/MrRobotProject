import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { testcase } from "../modules/testcase";
import { Router } from '@angular/router'

@Injectable({
  providedIn: "root",
})
export class testcaseService {

  selectedTesCase: testcase;
  testcases: testcase[];
  readonly baseURL = 'http://localhost:5555/testcase';
  private create = 'http://localhost:5555/testcase/create';
  private create2 = 'http://localhost:5555/testcase/create2';
  private delete = 'http://localhost:5555/testcase/deleted';
  private restore = 'http://localhost:5555/testcase/restore';
  private tfs = 'http://localhost:4200/assets/tfs.json';


  constructor(
    private http: HttpClient,
    private _router: Router
  ) {}
  
 
  postTestCase(testcase,file:File) {
    const formData  = new FormData();
    formData .append('file', file);
    formData .append('name', testcase.name);
    formData .append('step1', testcase.step1);
    formData .append('modify', testcase.modify);
    formData .append('run', testcase.run);
    formData .append('delete', testcase.delete);
    formData .append('step2', testcase.step2);
    formData .append('step3', testcase.step3);
    formData .append('step4', testcase.step4);
    formData .append('step5', testcase.step5);
    formData .append('step6', testcase.step6);
    formData .append('step7', testcase.step7);

    return this.http.post<any>(this.create,   formData );
  }
  postFile(file:File) {
    const formData  = new FormData();
    formData.append('file', file);
    

    return this.http.post<any>(this.create2, formData   );
  }
  writeTestCase(testcase) {
    return this.http.post(this.create2, testcase);
  }
  getTestCase() {
    return this.http.get<any>(this.baseURL);
  }
  gettfs() {
    return this.http.get<any>(this.tfs)
  }

  putTestCase(emp: testcase) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  /*deleteTestCase(_id: string) {
    return this.http.delete(this.delete + `/${_id}`);
  }*/
  deleteTestCase(id) {
    return this.http.put(this.delete + `/${id}`, id);
  }
  restoreTestCase(id) {
    return this.http.put(this.restore + `/${id}`, id);
  }

  
}
