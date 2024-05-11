import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  currentUser: any;

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users').pipe(
      catchError((error) => {
        return throwError(error.error.message || 'An unknown error occurred.');
      })
    );
  }
  getCookie(name: string = 'jwt'): string | null {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];

    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }
}
// delete this
