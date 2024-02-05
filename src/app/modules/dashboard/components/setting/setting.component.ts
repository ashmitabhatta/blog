import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import { Setting } from '../../model/post.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent {
  user = localStorage.getItem('loggedInUser');
  setting:Setting|undefined;
  settingvalue:Setting|undefined;
  loggedInUserId=localStorage.getItem('userId');
  settingForm:FormGroup=new FormGroup({})
  constructor(private route: Router,private service:SignupService,private fb:FormBuilder) { }
  ngOnInit(){
    this.settingForms();
    this.getSetting();
    this.patchSettingForm();
    // this.settingUpdate()
  }
  
  settingForms(){
    this.settingForm=this.fb.group({
     headerColor:new FormControl(''),
     buttonColor:new FormControl(''),
     usernameColor:new FormControl(''),
     usernameFontsize:new FormControl(''),
     headerFont:new FormControl('')
    })
  }
  back() {
    this.route.navigate(['blog']);
  }
  changeSetting() {
    this.setting=this.settingForm.value;
    if(this.loggedInUserId){
      this.service.updateSetting(this.loggedInUserId,this.settingForm.value).subscribe({
        next:(settingvalue)=>{
         alert("Setting changed successfully");
         console.log(settingvalue);
         this.service.settingUpdate(this.setting as Setting);
         this.route.navigate(['/blog'])
        },
        error:(error)=>{
          console.log("Error occured",error);
        }
      })
    }
  }
  getSetting() {
    if (this.loggedInUserId) {
      this.service.getSetting(this.loggedInUserId).subscribe({
        next: (settingData) => {
          this.setting = settingData;
          this.patchSettingForm();
          console.log('Setting Data:', this.setting);
         
        },
        error: (error) => {
          console.log("Error occurred", error);
        }
      });
      
    }
  }
  patchSettingForm() {
    if (this.setting) {
      this.settingForm.patchValue({
        headerColor: this.setting.headerColor,
        buttonColor: this.setting.buttonColor,
        usernameColor: this.setting.usernameColor,
        usernameFontsize: this.setting.usernameFontsize,
        headerFont: this.setting.headerFont
      });
    }
  }
  
  
}
