import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogListComponent } from './pages/blog-list/blog-list.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { AddEditBlogComponent } from './pages/add-edit-blog/add-edit-blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/:id', component: BlogDetailComponent },
  { path: 'add', component: AddEditBlogComponent },
  { path: 'edit/:id', component: AddEditBlogComponent }
];
