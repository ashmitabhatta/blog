import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SignupService } from 'src/app/modules/authentication/service/signup.service';
import { AddBlogComponent } from '../add-blog/add-blog.component';
@Component({
  selector: 'app-edit-blog',
  template: '<app-add-blog [isEditing]="true" [postId]="postId"></app-add-blog>',
  styleUrls: ['./edit-blog.component.scss']
})
export class EditBlogComponent implements AfterViewInit{
constructor(private service:SignupService,private route: ActivatedRoute, private fb:FormBuilder){}
@ViewChild(AddBlogComponent)childComponent!:AddBlogComponent;
postId: number | null=null;
ngAfterViewInit() {
    this.route.params.subscribe(params => {
      this.postId=params['id']
      if(this.postId!==null){
        this.service.getPostById(this.postId).subscribe((blog)=>{
          this.childComponent.addBlogForm.patchValue({
            title: blog.title,
            author: blog.author,
            createddate: blog.createddate,
          });
          this.childComponent.addBlogForm.setControl('content', this.patchContentArray(blog.content));
        })
      }
    });
}
patchContentArray(contentArray: any[]): FormArray {
  const contentControls = contentArray.map((paragraph) =>
    this.fb.group({
      paragraph: [paragraph.paragraph, Validators.required],
    })
  );
  return this.fb.array(contentControls);
}

}

