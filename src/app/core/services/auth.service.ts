import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    this.userData();
  }

  user: BehaviorSubject<any> = new BehaviorSubject(null);

  register(form: any): Observable<any> {
    return this.http.post(
      'https://note-sigma-black.vercel.app/api/v1/users/signUp',
      form
    );
  }

  login(form: any): Observable<any> {
    return this.http.post(
      'https://note-sigma-black.vercel.app/api/v1/users/signIn',
      form
    );
  }

  userData() {
    const Token = localStorage.getItem('userToken');
    if (Token != null) {
      const userData = jwtDecode(Token);
      this.user.next(userData);
      this.router.navigate(['/home']);
    }
  }
}
