import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { PipesPipe } from 'src/app/pipe/pipes.pipe';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    HeaderComponent,
    BlogComponent,
    AddBlogComponent,
    EditBlogComponent,
    SnackbarComponent,
    ViewBlogComponent,
    
  ],
  // entryComponents:[CustomSnackbarComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    AuthenticationModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    PipesPipe,
    MatSelectModule,
    FormsModule,
    MatSlideToggleModule,
    MatTableModule

  ],
  providers:[
    
  ]
})
export class DashboardModule { }
