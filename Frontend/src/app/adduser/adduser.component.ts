import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../event.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  specialEvents = []

  constructor(public _authService: AuthService,
    private _eventService: EventService,
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

}
