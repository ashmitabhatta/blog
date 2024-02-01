import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Postdetails } from '../../dashboard/model/post.interface';
import { Posts, Userlist } from '../model/user.interface';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private url = `http://localhost:3000`;
  private loggedInUserSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);
  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('loggedInUser');
    if (storedUsername) {
      this.loggedInUserSubject.next(storedUsername);
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
  checkUser(username: String, password: String): Observable<boolean> {
    const url = `${this.url}/signup`;
    return this.http.get<Userlist[]>(url).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        return !!user; //boolean convertion
      })
    );
  }
  setLoggedInUser(username: string): void {
    this.loggedInUserSubject.next(username);
    localStorage.setItem('loggedInUser', username); //local storage value set
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
 
}
