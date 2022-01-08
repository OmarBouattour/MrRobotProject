import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  msg = '';

  handleSubmit(e){
    e.preventDefault();
    alert(this.msg);
  }
  
  handleKeyUp(e){
    if(e.keyCode === 13){
       this.handleSubmit(e);
    }
  }
  
  loginUserData = {'email': '',
  'password': ''}
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/admin'])
      },
      err => {
        console.log(err);
        document.getElementById("response").innerHTML = JSON.stringify(err.error);
        
      }
    ) 
  }

}
