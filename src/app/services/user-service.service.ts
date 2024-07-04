import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  private REST_API_SERVER = 'https://localhost:7211/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  private currentUser: any;
  public currentUserIdSubject = new BehaviorSubject<number>(this.getCurrentUserId());
  public currentUserId$ = this.currentUserIdSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  public checkLoginUser(username: string, password: string): Observable<boolean> {
    const url = `${this.REST_API_SERVER}/Users`;
    return this.httpClient.get<any[]>(url).pipe(
      map(users => {
        const foundUser = users.find(user => user.userName === username && user.password === password && user.ruleId == 1);
        if (foundUser) {
          this.setCurrentUser(foundUser.id, foundUser);
        }
        return !!foundUser;
      })
    );
  }

  public checkLoginUserAdmin(username: string, password: string): Observable<boolean> {
    const url = `${this.REST_API_SERVER}/Users`;
    return this.httpClient.get<any[]>(url).pipe(
      map(users => {
        const foundUser = users.find(user => user.userName === username && user.password === password && user.ruleId != 1);
        if (foundUser) {
          this.setCurrentUserAdmin(foundUser.id, foundUser);
        }
        return !!foundUser;
      })
    );
  }

  public setCurrentUser(id: number, user: any): void {
    this.currentUser = user;
    sessionStorage.setItem(`user-${id}`, JSON.stringify(user));
    sessionStorage.setItem('currentUserId', id.toString());
    this.currentUserIdSubject.next(id);
  }

  public setCurrentUserAdmin(id: number, user: any): void {
    this.currentUser = user;
    sessionStorage.setItem(`user-admin-${id}`, JSON.stringify(user));
    sessionStorage.setItem('currentAdminUserId', id.toString());
    this.currentUserIdSubject.next(id);
  }

  public getCurrentUser(): any {
    if (!this.currentUser) {
      const id = this.getCurrentUserId();
      this.currentUser = JSON.parse(sessionStorage.getItem(`user-${id}`));
    }
    return this.currentUser;
  }

  public isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  public getCurrentUserId(): number {
    const userId = Number(sessionStorage.getItem('currentUserId'));
    return userId;
  }

  public logOutClient(): void {
    const userId = this.getCurrentUserId();
    this.currentUser = null;
    sessionStorage.removeItem(`user-${userId}`);
    sessionStorage.removeItem('currentUserId');
    this.currentUserIdSubject.next(0);
  }

  public logOutAdmin(): void {
    const userId = this.getCurrentUserId();
    this.currentUser = null;
    sessionStorage.removeItem(`user-admin-${userId}`);
    sessionStorage.removeItem('currentAdminUserId');
    this.currentUserIdSubject.next(0);
  }

  public registerUser(username: string, password: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/users`;
    const userUrl = `${url}?name=${username}`;

    return this.httpClient.get<any[]>(userUrl).pipe(
      switchMap(users => {
        if (users.length > 0) {
          return of(false);
        } else {
          const newUser = {
            id: (new Date()).getTime().toString(),
            name: username,
            password: password
          };
          return this.httpClient.post(url, newUser).pipe(
            map(response => true)
          );
        }
      })
    );
  }
}
