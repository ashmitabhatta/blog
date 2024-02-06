import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Setting } from 'src/app/modules/dashboard/model/post.interface';
import { DashboardService } from 'src/app/modules/dashboard/service/dashboard.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  loggedInUser: string | null = null;
  userId = localStorage.getItem('userId');
  constructor(private router: Router, private signupService: SignupService,private dashboardService:DashboardService) { }
  signup() {
    this.router.navigate(['/signup']);
  }
  ngOnInit() {
    localStorage.clear();
  }
  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;
      this.signupService.checkUser(username, password).subscribe({
        next: (loginSuccessful) => {
          if (loginSuccessful) {
            this.signupService.setLoggedInUser(username);
            this.router.navigate(['/blog']);
            const userId = localStorage.getItem('userId');
            if (userId) {
              this.dashboardService.getSetting(userId).subscribe({
                next: (setting: Setting) => {
                  this.dashboardService.settingUpdate(setting);
                },
                error: (error) => {
                  alert('An error occurred while getting the setting');
                },
              });
            }
          } else {
            alert('Invalid login credentials');
          }
        },
        error: (error) => {
          alert('An error occurred during login');
        },
      });
    }
     else {
      alert('Invalid user credentials');
    }
  }


}
