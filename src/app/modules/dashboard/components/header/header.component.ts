import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  loggedInUsername: string | null = null;
  @Input()selectedBlog: string = 'personel';
    private subscription: Subscription
  constructor(
    private router: Router,
    private service: SignupService
  ) {
    this.subscription = this.service.getLoggedInUser().subscribe((username) => {
      
      this.loggedInUsername = username;
    });
  }
  logout() {
    confirm("Are you sure you want to logout");
    this.router.navigate(['']);
    localStorage.clear()
  }
  addBlog(){

    this.router.navigate(['blog/add-blog']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  allBlog(){
    console.log("Clickd");
  }
}
