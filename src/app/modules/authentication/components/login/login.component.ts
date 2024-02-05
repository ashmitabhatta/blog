import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SignupService } from '../../service/signup.service';
import { Setting } from 'src/app/modules/dashboard/model/post.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword: boolean = true;
  loggedInUser: string | null = null;
  userId = localStorage.getItem('userId');
  constructor(private router: Router, private service: SignupService) { }
  signup() {
    this.router.navigate(['/signup']);
  }
  ngOnInit() {
  }
  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;
      this.service.checkUser(username, password).subscribe({
        next: (loginSuccessful) => {
          if (loginSuccessful) {
            this.service.setLoggedInUser(username);
            this.router.navigate(['/blog']);
            const userId = localStorage.getItem('userId');
            if (userId) {
              this.service.getSetting(userId).subscribe({
                next: (setting: Setting) => {
                  console.log(setting);
                  this.service.settingUpdate(setting);
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
    } else {
      alert('Invalid user credentials');
    }
  }


}
