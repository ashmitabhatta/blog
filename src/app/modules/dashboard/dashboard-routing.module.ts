import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { HeaderComponent } from './components/header/header.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { usermanagerGuard } from 'src/app/usermanager.guard';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

const routes: Routes = [
{path:'',component:BlogComponent},
// {path:'header',component:HeaderComponent}
{path:'add-blog',component:AddBlogComponent,canMatch:[usermanagerGuard]},
{path:'edit-blog/:id',component:EditBlogComponent,canMatch:[usermanagerGuard]},
{path:'view-blog/:id',component:ViewBlogComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
