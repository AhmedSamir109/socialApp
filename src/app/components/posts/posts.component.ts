import { PostService } from './../../services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPost } from '../../models/ipost';
import { Router } from '@angular/router';
import { IUsers } from '../../models/iusers';
import { UsersService } from '../../services/users.service';
import { UserPosts } from '../../models/user-posts';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {

 constructor(private _postService:PostService , private _userServices:UsersService , private _Router :Router){}

  comment:string ="";
  posts : UserPosts[] =[];


  users:IUsers[]=[]
  user : IUsers| null = null ;

  hiddenPostsId: string[] = []

  postsWithUsers:any ;

  // isLoad = true;
  
  ngOnInit(): void {

    const loggedUser = localStorage.getItem("loggedUser");
    this.user = loggedUser ? JSON.parse(loggedUser) : null ;

    const HiddenPosts = localStorage.getItem("hiddenPostsId");
    this.hiddenPostsId = HiddenPosts ? JSON.parse(HiddenPosts) : [] ;
    
    this.GetUserPosts();
  
  }

  GetUserPosts(){

    this._userServices.getUsers().subscribe(data => {

      this.users = data;
      
      this._postService.getPost().subscribe(posts => {
        
        this.posts = posts.map(post => ({
          ...post,
          user: this.users.find(user => user.id == post.userId) ?? {} as IUsers
        }));

        // this.isLoad = false;
      });
    });

  }


deletePost(id: string) {

  this._postService.deletePost(id).subscribe({
    next: () => {

      this._userServices.getUsers().subscribe(users => {
        this.users = users; 

        this._postService.getPost().subscribe(posts => {

          this.posts = posts.map(post => ({
            ...post,
            user: this.users.find(user => user.id == post.userId) ?? {} as IUsers

          }));

        });

      });

    },
    error: (err) => {
      console.error('Error deleting post:', err);
    },
  });
}

editPost(id : string){
  this._Router.navigate(['edit-post' , id])
  this._postService.toEdit.next(true);
}


HidePost(id:string){

  console.log(id);

  if(!this.hiddenPostsId.includes(id)){
    
    this.hiddenPostsId.push(id);

    localStorage.setItem("hiddenPostsId" , JSON.stringify(this.hiddenPostsId));

    this.GetUserPosts()

  }
}


onLikeClick(post:IPost){
  post.isLiked = !post.isLiked
  this._postService.likePost(post).subscribe({
    next : (post) => { console.log(post);
    }
  })
}



// getPost(){
//   this._postService.getPost().subscribe({
//     next: (data) => {
//       this.posts = data;
//       console.log(this.posts);
//     },
//     error: (err) => {throw err},
//     complete: () => {this.isLoad = false}
//   })    
// }

// getUsers(){
//   this._userServices.getUsers().subscribe({
//     next: data =>  this.users = data 
//   })
// }


// addComment(post:IPost){
//   post.comments.push(this.comment);
//   this.comment = "";
//   this._postService.editPost(post).subscribe({
//     next : (post) => { console.log(post);
//     }
//   })
// }

}
