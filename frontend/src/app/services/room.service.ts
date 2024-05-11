import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient) {}

  createRoom(roomName: string, roomUsers: any[]): Observable<any> {
    return this.http
      .post('http://localhost:3000/room/', {
        name: roomName,
        users: roomUsers,
      })
      .pipe(
        catchError((error) => {
          return throwError(
            error.error.message || 'An unknown error occurred.'
          );
        })
      );
  }

  getUserRooms(userId: string): Observable<any> {
    return this.http.get(`http://localhost:3000/room/${userId}`).pipe(
      catchError((error) => {
        return throwError(error.error.message || 'An unknown error occurred.');
      })
    );
  }

  addMembers(roomId: string, users: any[]) {
    return this.http
      .post(`http://localhost:3000/room/${roomId}`, {
        users,
      })
      .pipe(
        catchError((error) => {
          return throwError(
            error.error.message || 'An unknown error occurred.'
          );
        })
      );
  }
}
