import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Postdetails, Setting } from '../../dashboard/model/post.interface';
import { Posts, Userlist } from '../model/user.interface';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private url = `http://localhost:3000`;
  loggedInUserId=localStorage.getItem('userId');
  private loggedInUserSubject: BehaviorSubject<string | null> =
  new BehaviorSubject<string | null>(null);
  private loggedInUserIdSubject: BehaviorSubject<number | null> =
  new BehaviorSubject<number | null>(null);
  // private settingSubject=new BehaviorSubject<Setting|null>(null);
  // setting$=this.settingSubject.asObservable();
  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('loggedInUser');
    // const storedSetting=localStorage.getItem('setting')
    // console.log(storedSetting);
    if (storedUsername) {
      this.loggedInUserSubject.next(storedUsername);
      // this.settingSubject.next(JSON.parse(storedSetting));
    }
  }
  addUsers(users: Userlist): Observable<Userlist> {
    console.log(users);
    return this.http.post<Userlist>(`${this.url}/signup`, users);
  }
  checkDuplicateUsername(username: string): Observable<boolean> {
    const url = `${this.url}/signup?username=${username}`;
    return this.http.get<Userlist[]>(url).pipe(
      map((users) => {
        console.log(users.length > 0, users);
        return users.length > 0;
      })
    );
  }
  checkUser(username: string, password: string): Observable<boolean> {
    const url = `${this.url}/signup`;
    return this.http.get<Userlist[]>(url).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user?.id) {
          this.loggedInUserId = user.id.toString();
          localStorage.setItem('userId', this.loggedInUserId);
           
        }
        return !!user; //boolean convertion
      })
    );
  }
  getLoggedInUserId(): string | null {
    console.log(this.loggedInUserId);
    return this.loggedInUserId;
  }
  setLoggedInUser(username: string): void {
    this.loggedInUserSubject.next(username);
    localStorage.setItem('loggedInUser', username); 
  }
  setLoggedInUserId(id: string): void {
    this.loggedInUserSubject.next(id);
  }
  getLoggedInUser(): Observable<string | null> {
    return this.loggedInUserSubject.asObservable();
  }
 
}
