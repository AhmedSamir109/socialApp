import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreateNewPostComponent } from './components/create-new-post/create-new-post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { pathGuard } from './guards/path.guard';

const routes: Routes = [
  {path:' ', redirectTo:'login' , pathMatch:'full'},
  {path:'login' , component:LoginFormComponent , title:'LogIn' },
  {path:'register' , component:RegisterFormComponent , title:'Register'},
  {path:'posts' , component:PostsComponent , title:'Home' , canActivate:[pathGuard]},
  {path:'create-post' , component:CreateNewPostComponent , title:'Create Post' , canActivate:[pathGuard] },
  {path:'edit-post/:postID' , component:CreateNewPostComponent , title:'Edit Post' , canActivate:[pathGuard] },

  { path: 'user-profile', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule)  , canActivate:[pathGuard]},
  { path: 'edit-profile', loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordModule) ,canActivate:[pathGuard] },
 
  {path:'**' , component:NotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
