import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Setting } from '../../model/post.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
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
  constructor(private route: Router,private fb:FormBuilder,private dashboardService:DashboardService) { }
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
      this.dashboardService.updateSetting(this.loggedInUserId,this.settingForm.value).subscribe({
        next:(settingvalue)=>{
         alert("Setting changed successfully");
         this.dashboardService.settingUpdate(this.setting as Setting);
        },
        error:(error)=>{
          alert("Error occured");
        }
      })
    }
  }
  getSetting() {
    if (this.loggedInUserId) {
      this.dashboardService.getSetting(this.loggedInUserId).subscribe({
        next: (settingData) => {
          this.setting = settingData;
          this.patchSettingForm();
        },
        error: () => {
          alert("Error occured");
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
