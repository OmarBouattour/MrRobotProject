import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../event.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData = {'email': '',
  'password': '',
  'role':''}

  specialEvents = []
  constructor(private _eventService: EventService,
    private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this._eventService.getRegisterEvents()
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

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        //localStorage.setItem('token', res.token)
        this._router.navigate(['/admin'])
      },
      err => {
        console.log(err);
        document.getElementById("response").innerHTML = JSON.stringify(err.error);
        if( err instanceof HttpErrorResponse ) {
          if (err.status === 401) {
            this._router.navigate(['/register'])
          }
        }
        
      }
    )      
  }

}
