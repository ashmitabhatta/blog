import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import { Content, Postdetails } from '../../model/post.interface';
import { SnackbarComponent } from '../../snackbar/snackbar.component';
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent {
  addBlogForm: FormGroup = new FormGroup({});
  @Input() isEditing: boolean = false;
  @Input() postId: number | null = null;
  postid: number | undefined | null;
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private fb: FormBuilder,
    private service: SignupService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.addBlog();
    console.log(this.route, "Route")
    
  }
  user = localStorage.getItem('loggedInUser');
  addBlog() {
    this.addBlogForm = this.fb.group({
      title: ['', [Validators.required]],
      author: this.user,
      createdate: [new Date(), Validators.required],
      content: this.fb.array([this.contentParagraph()]),
    });
  }
  contentParagraph(): FormGroup {
    return this.fb.group({
      paragraph: '',
    });
  }
  get contentArray() {
    return this.addBlogForm.get('content') as FormArray;
  }
  addParagraph() {
    this.contentArray.push(this.contentParagraph());
  }
  removeParagraph(index: number) {
    this.contentArray.removeAt(index);
  }
  getContent(data: Content[]): Content[] {
    const contentArray: Content[] = [];
    data.map((contents: Content, i: number) => {
      const content: Content = {
        paragraph: contents.paragraph,
        id: i + 1,
      }
      contentArray.push(content);
    })
    return contentArray;
  }
  submitBlog() {
    const userName = localStorage.getItem('loggedInUser');
    if (!this.isEditing) {
      if (userName !== null && this.addBlogForm.valid) {
        const payload: Postdetails = {
          ...this.addBlogForm.value,
          content: this.getContent(this.addBlogForm.value.content)
        }
        this.service.addBlog(payload).subscribe({
          next: () => {
            this._snackBar.openFromComponent(SnackbarComponent, {
              duration: this.durationInSeconds * 1000,
              verticalPosition: this.verticalPosition,
              horizontalPosition: this.horizontalPosition,
              panelClass: ['success-snack-bar']
            });
            this.route.navigate(['/blog'])
          },
          error: () => {
            alert('Error occured');
          },
        });
      } else {
        alert('Error occured');
      }
      this.addBlogForm.reset();
    }
    else {
      this.postId = this.postId;
      if (userName !== null && this.postId !== null && this.addBlogForm.valid) {
        const payload: Postdetails = {
          ...this.addBlogForm.value,
          content: this.getContent(this.addBlogForm.value.content)
        };
        this.service.updateBlog(this.postId, payload).subscribe({
          next: () => {
            this._snackBar.openFromComponent(SnackbarComponent, {
              duration: this.durationInSeconds * 1000,
              verticalPosition: this.verticalPosition,
              horizontalPosition: this.horizontalPosition,
            })
            this.route.navigate(['/blog'])
          },
        });
      } else {
        alert('Error occured');
      }
    }
  }
  back() {
    this.route.navigate(['/blog'])
  }
}


