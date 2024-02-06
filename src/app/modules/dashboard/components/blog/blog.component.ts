import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import { Postdetails } from '../../model/post.interface';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../service/dashboard.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  postDetail: Postdetails[] = [];
  postId: number | undefined;
  selectedBlog: string = 'personal';
  loggedInUser: string | null = null;
  displayTable: boolean = false;
  tableColumns: string[] = ['title', 'author', 'createdate', 'actions'];
  isChecked = true;
  dataSource = new MatTableDataSource<Postdetails[]>([]);
  checkAuthor: string | undefined | null;
  user = localStorage.getItem('loggedInUser');
  constructor(private signupService: SignupService,
    private route: Router,
    private dashboardService:DashboardService) { }
  ngOnInit(): void {
    this.getBlog();
    
  }
  getBlog() {
    if (this.selectedBlog === 'personal') {
      this.signupService.getLoggedInUser().subscribe((username) => {
        if (username) {
          this.dashboardService.getPosts(username).subscribe((posts) => {
            this.postDetail = posts;
          });
        }
      });
    } else {
      this.dashboardService.getAllPosts().subscribe((posts) => {
        this.postDetail = posts;
      });
    }
  }
  editBlog(postId: number) {
    this.dashboardService.getPostById(postId).subscribe((post) => {
      this.checkAuthor = post.author;
      if (this.checkAuthor === this.user) {
        this.route.navigate(['blog/edit-blog', postId]);
      }
    });
  }
  deleteBlog(postId: number): void {
    this.dashboardService.getPostById(postId).subscribe((post) => {
      this.checkAuthor = post.author;
      if (this.checkAuthor === this.user) {
        this.dashboardService.deletePost(postId).subscribe(() => {
          alert('Post deleted successfully');
          this.getBlog();
        });
      }
    }
    )

  }

  viewBlog(postId: number) {
    this.route.navigate(['blog/view-blog', postId])
  }
  showTable() {
    this.displayTable = !this.displayTable;
  }
}
