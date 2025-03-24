import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPost } from '../../models/ipost';
import { IUsers } from '../../models/iusers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-new-post',
  templateUrl: './create-new-post.component.html',
  styleUrl: './create-new-post.component.css'
})
export class CreateNewPostComponent implements OnInit , OnDestroy {

  post:IPost ={
    id: (Math.random() * new Date().getTime()).toFixed().toString(),
    postContent:"",
    postImg:"",
    isLiked:false,
    userId:0,
    createdOn:new Date()
  };

  // post:IPost = {} as IPost;

  createPost = new FormGroup({
    postBody : new FormControl("" , [Validators.required , Validators.minLength(1) , Validators.maxLength(250)] ),
    postImg: new FormControl("" , [Validators.required] )
  });

  EditMode: boolean = false;
  postID :string = "" ;
  posts : IPost[] = [];
  user : IUsers | null = null ;


  constructor(private _postService : PostService  , private _Router : Router , private _ActivatedRoute :ActivatedRoute){

    const userData = localStorage.getItem("loggedUser");
    this.user = userData ? JSON.parse(userData) : null;
    console.log(this.user);
     

  };
  
  ngOnInit(){

    this._postService.toEdit.subscribe({
      next : (behaviorSubVal) => {
        this.EditMode = behaviorSubVal;
        console.log(behaviorSubVal , this.EditMode);
      }
    });

    this._ActivatedRoute.params.subscribe({
      next: (parms) => {
        this.postID = parms?.['postID'];
      }
    });

    this._postService.getPost().subscribe({
      next: (data) => {
        this.posts = data;
        this.getSelectedPost();
      }
    });


     
  };
  


  getSelectedPost() {

    if (this.postID) {
        const post = this.posts.find(post => post.id === this.postID);
        if (post) {
          this.createPost.get('postBody')?.setValue(post.postContent);
          this.createPost.get('postImg')?.setValue(post.postImg);
        }
    }
  };

 

  AddPostForm(Post:any){

    Post.markAllAsTouched();

    if(Post.valid){

      this.post.userId =Number(this.user?.id ?? 0);
      console.log(typeof this.post.userId);
      
      this.post.postContent = Post.value.postBody;
      this.post.postImg = Post.value.postImg ;

      this._postService.createPost(this.post).subscribe({
        next:()=>{
          this._Router.navigate(['posts'])
        }
      })
    }
  };


  EditPost(Post:any){

    Post.markAllAsTouched();

    if(Post.valid){
    
    this.post.userId =Number(this.user?.id ?? 0);
    this.post.id = this.postID ;
    this.post.postContent = Post.value.postBody;
    this.post.postImg = Post.value.postImg ;

    this._postService.editPost(this.post).subscribe({
      next : () => {
        this._Router.navigate(['posts'])
        this.showSweatAlert();
      }
    })

    }
  }


  ngOnDestroy(): void {
    this._postService.toEdit.next(false);
  };

  showSweatAlert(){
      Swal.fire({
        icon: "success",
        title: "Post is Edited",
        showConfirmButton: false,
        timer: 2000
      }).then( () => {
        Swal.close();
      })
     }
  

}
