import { Injectable } from '@angular/core';
import { Postdetails, Setting } from '../model/post.interface';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Posts } from '../../authentication/model/user.interface';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private url = `http://localhost:3000`;
  private settingSubject=new BehaviorSubject<Setting|null>(null);
  setting$=this.settingSubject.asObservable();
  constructor(private http: HttpClient) {
    const storedSetting=localStorage.getItem('setting')
    if ( storedSetting) {
      this.settingSubject.next(JSON.parse(storedSetting));
    }
  }
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
