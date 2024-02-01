import { Component, Signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import { Postdetails } from '../../model/post.interface';
@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent {
  constructor(private service: SignupService,private route:Router, private router: ActivatedRoute) {}
  postId!: number;
  displayblog: Postdetails[] | undefined;
  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.postId = params['id'];
      console.log(this.postId);
    });
    this.viewBlog(this.postId);
  }
  viewBlog(postId: number) {
    this.service.getPostById(postId).subscribe({
      next: (blog) => {
        this.displayblog = [blog];
        console.log('data viewed successfully',  this.displayblog);
      },
      error: (error) => {
        console.log('Error in displaying data', error);
      },
    });
  }
  back(){
    this.route.navigate(['/blog'])
  }
}
