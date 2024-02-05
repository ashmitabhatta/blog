import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import { Setting, Style } from '../../model/post.interface';

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
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = this.service.getLoggedInUser().subscribe((username) => {
      this.loggedInUsername = username;
    });
  }
  ngOnInit():void{
    this.service.setting$.subscribe((setting)=>{
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
    console.log("Clickd");
  }
  setting(){
    this.router.navigate(['blog/setting']);
  }
  headerStyle(){
    if (this.loggedInUserId) {
      this.service.getSetting(this.loggedInUserId).subscribe({
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
          console.log(style);
        },
        error: (error) => {
          console.log("Error fetching settings", error);
        }
      });
    }
  }
}
