import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { tb_test } from "../modules/tb_test";

@Injectable({
  providedIn: "root",
})
export class tbsuitecountService {
  private url = "http://localhost:5555/suitescount";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}
  
  

  fetchAll() {
    return this.http.get<any>(this.url)
  }

  
}
