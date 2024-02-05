import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PipesPipe } from 'src/app/pipe/pipes.pipe';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogComponent } from './components/blog/blog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { HeaderComponent } from './components/header/header.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SettingComponent } from './components/setting/setting.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete'
const MaterialModule = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatTableModule,
  MatAutocompleteModule
]
@NgModule({
  declarations: [
    HeaderComponent,
    BlogComponent,
    AddBlogComponent,
    EditBlogComponent,
    SnackbarComponent,
    ViewBlogComponent,
    DashboardComponent,
    SettingComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    AuthenticationModule,
    PipesPipe,
    FormsModule,
    MaterialModule
  ],
  providers: [

  ]
})
export class DashboardModule { }
