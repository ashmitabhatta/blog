import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postdetails } from '../../model/post.interface';
import { DashboardService } from '../../service/dashboard.service';
@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent {
  constructor( private route: Router, private router: ActivatedRoute,private dashboardService:DashboardService) { }
  postId: number | undefined;
  displayblog: Postdetails[] | undefined;
  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.postId = params['id'];
    });
    if(this.postId){
      this.viewBlog(this.postId);
    }
  }
  viewBlog(postId: number) {
    this.dashboardService.getPostById(postId).subscribe({
      next: (blog) => {
        this.displayblog = [blog];
      },
      error: () => {
       alert("Error occured");
      },
    });
  }
  back() {
    this.route.navigate(['/blog'])
  }
}
