import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-edit-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css']
})
export class AddEditBlogComponent implements OnInit {
  blogForm: FormGroup;
  isEditMode = false;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId) {
      this.isEditMode = true;
      this.blogService.getPostById(this.postId).subscribe((data) => {
        this.blogForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.isEditMode) {
        this.blogService.updatePost(this.postId!, this.blogForm.value).subscribe(() => {
          this.router.navigate(['/blogs']);
        });
      } else {
        this.blogService.createPost(this.blogForm.value).subscribe(() => {
          this.router.navigate(['/blogs']);
        });
      }
    }
  }
}
