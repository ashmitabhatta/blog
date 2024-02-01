import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../service/signup.service';
import { Userlist } from '../../model/user.interface';
import {
  confirmPasswordValidator,
  customemailValidation,
} from '../../validations/emailValidation';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  hidden = true;
  signUpForm!: FormGroup;
  usernameExists: boolean | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SignupService
  ) {}
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

      // ,{Validators:this.passwordValidator}
    );
  }

  // passwordValidator(signUpForm:FormGroup){
  //   const password=signUpForm.get('password')?.value;
  //   const confirmpassword=signUpForm.get('confirmpassword')?.value;
  //   return password === confirmpassword ? null : {mismatch:true};
  // }
  login() {
    this.router.navigate(['']);
  }
  onSubmit(signUpForm: FormGroup) {
    if (this.signUpForm.valid) {
      if (
        this.signUpForm.value.password === this.signUpForm.value.confirmpassword
      ) {
        const username = this.signUpForm.get('username')?.value;
        this.service.checkDuplicateUsername(username).subscribe((data) => {
          if (!data) {
            this.usernameExists = false;
            this.service.addUsers(signUpForm.value).subscribe(() => {
              alert('User Added sucessfully');
              this.router.navigate(['']);
            });
          } else {
            this.usernameExists = true;
            alert('User Already exist');
          }
        });
      } else {
        alert('Password didnot matched');
      }
    }
  }

  // onSubmit(signUpForm: FormGroup) {
  //   if (this.signUpForm.valid) {
  //     if (
  //       this.signUpForm.value.password === this.signUpForm.value.confirmpassword
  //     ) {
  //        const username=this.signUpForm.get('username')?.value;
  //       this.service
  //         .checkDuplicateUsername(username)
  //         .subscribe( {
  //           next:(exist:boolean)=>{
  //             if(!exist){
  //               this.service
  //               .addUsers({
  //                 ...signUpForm.value,
  //               } satisfies Userlist)
  //               .subscribe({
  //                 next: (response) => {
  //                   alert('User Added sucessfully');
  //                   this.router.navigate(['']);
  //                 },
  //                 error: (error) => {
  //                   console.log('Error occured', error);
  //                 },
  //               });
  //             }
  //             else{
  //               alert("Username already exist");
  //             }
  //           },
  //           error:(error)=>{
  //             console.log('Username already exist',error);

  //           }

  //         });
  //     } else {
  //       alert('Password didnot matched');
  //     }
  //   }
  // }
}
