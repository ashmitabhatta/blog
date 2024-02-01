import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import { Postdetails } from '../../model/post.interface';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  loggedInUserPost: Postdetails[]=[];
  postId: number | undefined;
  filteredPosts: Postdetails[] | null = null;
  selectedBlog: string = 'personal';
  loggedInUser: string | null = null;
  displayTable: boolean = true;
  tableColumns: string[] = ['title', 'author', 'createdate', 'actions'];
  isChecked = true;
  // disabledButton:boolean=false;
  dataSource:Postdetails[]=this.loggedInUserPost;
  checkAuthor:string|undefined|null;
  user = localStorage.getItem('loggedInUser');
  constructor(private service:SignupService,
  private route:Router,
  private router:ActivatedRoute){}
ngOnInit():void{
  this.getBlog();
}

getBlog() {
  console.log('Selected Blog:', this.selectedBlog);
  if (this.selectedBlog === 'personal') {
    this.service.getLoggedInUser().subscribe((username) => {
      if (username) {
        this.service.getPosts(username).subscribe((user) => {
          this.loggedInUserPost = user;
        });
      }
    });
  } else {
    this.service.getAllPosts().subscribe((posts) => {
      this.loggedInUserPost = posts;
    });
  }
}
editBlog(postId: number){
  this.service.getPostById(postId).subscribe((post)=>{
    this.checkAuthor=post.author;
    if (this.checkAuthor === this.user) {
      // console.log(this.disabledButton);
      // this.disabledButton=false;
      this.route.navigate(['blog/edit-blog', postId]);
    } else {
      // this.disabledButton=true;
      alert("You are not authorized to edit this post.");
    }
  });
}
deleteBlog(postId: number): void {
  console.log(this.loggedInUserPost);
  this.service.getPostById(postId).subscribe((post)=>{
    this.checkAuthor=post.author;
    if (this.checkAuthor === this.user) {
      this.service.deletePost(postId).subscribe(() => {
        alert('Post deleted successfully');
        this.getBlog();
      });
    } else {
      alert("You are not authorized to delete this post.");
    }
  }
  )
     
  }
viewBlog(postId:number){
  this.route.navigate(['blog/view-blog',postId])
}
showTable(){
  this.displayTable = !this.displayTable;
}
}
