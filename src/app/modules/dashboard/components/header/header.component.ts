import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import {  Style } from '../../model/post.interface';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loggedInUsername: string | null = null;
  loggedInUserId=localStorage.getItem('userId');
  headerStyles:Style|undefined;
  @Input() selectedBlog: string = 'personel';
  private subscription: Subscription
  constructor(
    private router: Router,
    private service: SignupService,
    private dashboardService:DashboardService
   
  ) {
    this.subscription = this.service.getLoggedInUser().subscribe((username) => {
      this.loggedInUsername = username;
    });
  }
  ngOnInit():void{
    this.dashboardService.setting$.subscribe((setting)=>{
      if(setting){
        this.headerStyle();
      }
    })
  }
  logout() {
    confirm("Are you sure you want to logout");
    this.router.navigate(['']);
    localStorage.clear()
  }
  addBlog() {

    this.router.navigate(['blog/add-blog']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  allBlog() {
  }
  setting(){
    this.router.navigate(['blog/setting']);
  }
  headerStyle(){
    if (this.loggedInUserId) {
      this.dashboardService.getSetting(this.loggedInUserId).subscribe({
        next: (style) => {
          this.headerStyles = {
            header: {
              'background-color': style.headerColor,
              'font-family': style.headerFont,
            },
            button: {
              'color': style.buttonColor,
            },
            username: {
              'color': style.usernameColor,
              'font-size': style.usernameFontsize
            }
          };
        },
        error: () => {
          alert("Error occured");
        }
      });
    }
  }
}
