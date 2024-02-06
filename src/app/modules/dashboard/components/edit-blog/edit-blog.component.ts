import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddBlogComponent } from '../add-blog/add-blog.component';
import { DashboardService } from '../../service/dashboard.service';
import { Content } from '../../model/post.interface';
@Component({
  selector: 'app-edit-blog',
  template: '<app-add-blog [isEditing]="true" [postId]="postId"></app-add-blog>',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements AfterViewInit {
  @ViewChild(AddBlogComponent) childComponent!: AddBlogComponent;
  postId: number | null = null;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private dashboardService: DashboardService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
    });
  }
  ngAfterViewInit() {
    if (this.postId !== null) {
      this.dashboardService.getPostById(this.postId).subscribe((blog) => {
        setTimeout(() => {
          this.childComponent.addBlogForm.patchValue({
            title: blog.title,
            author: blog.author,
            createddate: blog.createddate,
          })
          this.childComponent.addBlogForm.setControl('content', this.patchContentArray(blog.content));
        });

      })
    }

  }
  patchContentArray(contentArray: Content[]): FormArray {
    const contentControls = contentArray.map((paragraph) =>
      this.fb.group({
        paragraph: [paragraph.paragraph, Validators.required],
      })
    );
    return this.fb.array(contentControls);
  }

}

