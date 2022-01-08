import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private _router: Router) { }
  
  private _loginUrl = "http://localhost:5555/api/login";
  private _registerUrl = "http://localhost:5555/api/register";

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  
  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  getToken() {
    return localStorage.getItem('token')
  }
  getAdmin(user) {
    if (user.role=='admin') {
      return true;
    }
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/home'])
  }

}
