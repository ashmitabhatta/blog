import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../service/signup.service';
import { confirmPasswordValidator, customemailValidation, } from '../../validations/customValidation';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  signUpForm: FormGroup = new FormGroup({});
  usernameExists: boolean | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SignupService
  ) { }
  ngOnInit() {
    this.signup();
  }
  signup() {
    this.signUpForm = this.fb.group(
      {
        // ,checkDuplicateUsername(this.service)
        username: this.fb.control('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        password: this.fb.control('', [Validators.required]),
        confirmpassword: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [
          Validators.required,
          customemailValidation(),
        ]),
      },
      { validators: confirmPasswordValidator }
    );
  }
  login() {
    this.router.navigate(['']);
  }
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
  onSubmit(signUpForm: FormGroup) {
    if (this.signUpForm.valid) {
      
        const username = this.signUpForm.get('username')?.value;
        this.service.checkDuplicateUsername(username).subscribe((data) => {
          if (!data) {
            this.usernameExists = false;
            this.service.addUsers(signUpForm.value).subscribe((response) => {
              alert('User Added sucessfully');
              const userId = response.id;
              const settingPayload={
                id:userId,
                headerColor:'Pink',
                buttonColor: 'Blue',
                usernameColor: 'White',
                usernameFontsize: '22px',
                headerFont: 'Calibri',
              };
              this.service.addSetting(settingPayload).subscribe(() => {
                
              });
              this.router.navigate(['']);
            });
          } else {
            this.usernameExists = true;
            alert('User Already exist');
          }
        });
      } 
    }
}

