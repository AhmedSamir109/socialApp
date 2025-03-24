import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { PostService } from '../../services/post.service';
import { IUsers } from '../../models/iusers';
import { Router } from '@angular/router';
import { IPost } from '../../models/ipost';
import { UserPosts } from '../../models/user-posts';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor(private _UsersService:UsersService , private _PostService:PostService , private _Router:Router){}
  
    comment:string ="";
    posts:any = [] 
    users:IUsers[]=[]
    loggedUser : IUsers = JSON.parse(localStorage.getItem("loggedUser") || '{}') as IUsers;


    user:IUsers | null = null ;
  
     changeUserImg = new FormGroup({
      userImg : new FormControl("" , Validators.required),
     })
  
    
    isLoad = true;
    
    ngOnInit(): void {

      const loggedUser = localStorage.getItem("loggedUser");
      this.user = loggedUser ? JSON.parse(loggedUser) : null ;

      console.log(this.user?.id);
      

      this._UsersService.getUsers().subscribe(users => {
        this.users = users;
        this._PostService.getPost().subscribe(posts => {
          this.posts = posts.map(post => ({
            ...post,
            user: this.users.find(user => user.id == post.userId) ?? null
          }));
  
          this.isLoad = false;
        });
      });
    }
  
  getPost(){
    this._PostService.getPost().subscribe({
      next: (data) => {
        this.posts = data;
        console.log(this.posts);
      },
      error: (err) => {throw err},
      complete: () => {this.isLoad = false}
    })    
  }
  
  getUsers(){
    this._UsersService.getUsers().subscribe({
      next: data =>  this.users = data 
    })
  }
  
  deletePost(id:string){
    this._PostService.deletePost(id).subscribe({
      next : (data) =>{ 
        this.getPost(); 
      }
    });
  }
  
  editPost(id : string){
    this._Router.navigate(['edit-post' , id])
    this._PostService.toEdit.next(true);
  }
  
  
  onLikeClick(post:IPost){
    post.isLiked = !post.isLiked
    this._PostService.likePost(post).subscribe({
      next : (post) => { console.log(post);
      }
    })
  }


  ChangeProfilePic(formData : FormGroup){
    
    formData.markAllAsTouched();
  
    if(formData.valid){
  
      this.loggedUser.userImg = formData.value.userImg ;
      
      this._UsersService.changeUserData(this.loggedUser).subscribe({
        next: () => {
          localStorage.setItem("loggedUser", JSON.stringify(this.loggedUser));
          this._UsersService.loggedUser.next(this.loggedUser);
  
          this.showSweatAlert();
          this._Router.navigate(['posts']);

        }
      });
  

  
    }
  
   }
  
   showSweatAlert(){
    Swal.fire({
      icon: "success",
      title: "profile pic changed",
      showConfirmButton: false,
      timer: 2000
    }).then( () => {
      Swal.close();
    })
   }

  

}
