import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  sendMessage(
    message: string,
    senderId: string,
    roomId: string
  ): Observable<any> {
    return this.http
      .post('http://localhost:3000/message/', {
        message,
        senderId,
        roomId,
      })
      .pipe(
        catchError((error) => {
          return throwError(
            error.error.message || 'An unknown error occurred.'
          );
        })
      );
  }

  getRoomMessages(roomId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/message/${roomId}`).pipe(
      catchError((error) => {
        return throwError(error.error.message || 'An unknown error occurred.');
      })
    );
  }
}
