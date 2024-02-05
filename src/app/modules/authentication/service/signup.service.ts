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
  private loggedInUserSubject: BehaviorSubject<string | null> =
  new BehaviorSubject<string | null>(null);
  private loggedInUserIdSubject: BehaviorSubject<number | null> =
  new BehaviorSubject<number | null>(null);
  private settingSubject=new BehaviorSubject<Setting|null>(null);
  setting$=this.settingSubject.asObservable();
  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('loggedInUser');
    const storedSetting=localStorage.getItem('setting')
    console.log(storedSetting);
    if (storedUsername && storedSetting) {
      this.loggedInUserSubject.next(storedUsername);
      this.settingSubject.next(JSON.parse(storedSetting));
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
    
  //local storage value set
  }
  setLoggedInUserId(id: string): void {
    this.loggedInUserSubject.next(id);
  //   localStorage.setItem('Id', id); 
  // //local storage value set
  }
  getLoggedInUser(): Observable<string | null> {
    return this.loggedInUserSubject.asObservable();
  }
  // private loggedInUsername: string | null = null;
  // setLoggedInUser(username: string) {
  //   this.loggedInUsername = username;
  // }
  // getLoggedInUser(): string | null {
  //   return this.loggedInUsername;
  // }

  // getPosts(username: string): Observable<Userlist | null> {
  //   return this.http
  //     .get<Userlist[]>(`${this.url}/signup?author=${username}`)
  //     .pipe(map((users) => (users.length > 0 ? users[0] : null)));
  // }

  getPosts(username: string): Observable<Postdetails[]> {
    return this.http.get<Postdetails[]>(`${this.url}/post?author=${username}`);
  }
  getAllPosts(): Observable<Postdetails[]> {
    return this.http.get<Postdetails[]>(`${this.url}/post`);
  }
  deletePost(postId: number): Observable<Posts | null> {
    return this.http.delete(`${this.url}/post/${postId}`).pipe(map(() => null));
  }
  addBlog(post: Postdetails): Observable<Postdetails> {
    return this.http.post<Postdetails>(`${this.url}/post`, post);
  }
  getPostById(postId: number): Observable<any> {
    const url = `${this.url}/post/${postId}`;
    return this.http.get<any>(url);
  }
  updateBlog(postId: number, updatedBlog: Postdetails): Observable<Postdetails> {
    const updateUrl = `${this.url}/post/${postId}`;
    return this.http.put<Postdetails>(updateUrl, updatedBlog);
  }
  getSetting(userId: string): Observable<Setting> {
    console.log(userId);
    return this.http.get<Setting>(`${this.url}/setting/${userId}`)
  }
  loggedInUserId=localStorage.getItem('userId');
  settingUpdate(setting:Setting){
    localStorage.setItem('setting',JSON.stringify(setting))
    this.settingSubject.next(setting);
  }
  addSetting(settingPayload:Setting):Observable<any>
  {
    const settingurl = `${this.url}/setting`;
    return this.http.post(settingurl,settingPayload);
  }
  updateSetting(settingId: string, setting: Setting): Observable<Setting> {
    const settingurl = `${this.url}/setting/${settingId}`;
    return this.http.put<Setting>(settingurl, setting);
  }
}
