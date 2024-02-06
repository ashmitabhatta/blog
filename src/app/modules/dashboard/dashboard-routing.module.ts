import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usermanagerGuard } from 'src/app/guard/usermanager.guard';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogComponent } from './components/blog/blog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { SettingComponent } from './components/setting/setting.component';
const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: BlogComponent },
      { path: 'add-blog', component: AddBlogComponent, canMatch: [usermanagerGuard] },
      { path: 'edit-blog/:id', component: EditBlogComponent, canMatch: [usermanagerGuard] },
      { path: 'view-blog/:id', component: ViewBlogComponent },
      {path:'setting',component:SettingComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
