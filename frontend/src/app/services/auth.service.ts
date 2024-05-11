import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  login(email: string, password: string): Observable<any> {
    const postData = { email, password };
    return this.http.post('http://localhost:3000/auth/signin', postData).pipe(
      catchError((error) => {
        return throwError(error.error.message || 'An unknown error occurred.');
      })
    );
  }

  signup(email: string, password: string, initials: string): Observable<any> {
    const postData = { email, password, initials };
    return this.http.post('http://localhost:3000/auth/signup', postData).pipe(
      catchError((error) => {
        return throwError(error.error.message || 'An unknown error occurred.');
      })
    );
  }

  isTokenValid(): boolean {
    const token = this.getCookie('jwt');

    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwt_decode.jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        return false;
      }

      console.log(decodedToken);

      this.userService.currentUser = decodedToken;

      return true;
    } catch (error) {
      console.error('Invalid JWT:', error);
      return false;
    }
  }

  getCurrentUserInfo(token: string = 'jwt') {
    return jwt_decode.jwtDecode(this.getCookie('jwt')!);
  }

  logout(tokenKey: string = 'jwt'): void {
    this.cookieService.delete(tokenKey);
  }

  getCookie(name: string = 'jwt'): string | null {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')[1];

    return cookieValue ? decodeURIComponent(cookieValue) : null;
  }

  setCookie(name: string = 'jwt', value: string) {
    document.cookie = `${name}=${value}`;
  }
}
