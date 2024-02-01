import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthenticationModule } from '../../authentication.module';
// import { SignupService } from '../../service/signup.service';
import { Userlist } from '../../model/user.interface';
import { SignupService } from '../../service/signup.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  loggedInUser: string | null = null;
  constructor(private router: Router, private service: SignupService) {}
  signup() {
    this.router.navigate(['/signup']);
  }
  ngOnInit() {}
  onSubmit(loginForm: NgForm): void {
    if (loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;
      this.service.checkUser(username, password).subscribe({
        next: (loginSuccessful) => {
          if (loginSuccessful) {
            this.service.setLoggedInUser(username);
            this.router.navigate(['/blog']);
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
