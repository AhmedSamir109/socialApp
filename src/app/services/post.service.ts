import { IPost } from './../models/ipost';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserPosts } from '../models/user-posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private _HttpClient: HttpClient ){}

  toEdit : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  posts : IPost[] = [];

  getPostHere(){
    this._HttpClient.get<IPost[]>('http://localhost:3000/posts').subscribe({
      next : (data) => { this.posts = data}
    });
  };

  getPost(){
    return this._HttpClient.get<IPost[]>('http://localhost:3000/posts');
  };

  deletePost(id:string){
    return this._HttpClient.delete(`http://localhost:3000/posts/${id}`);
  };


  createPost(post:IPost){
    return this._HttpClient.post('http://localhost:3000/posts' , post)
  }


  editPost(post:IPost){
    return this._HttpClient.put(`http://localhost:3000/posts/${post.id}` , post)
  }


  likePost(post:IPost ){
    return this._HttpClient.put(`http://localhost:3000/posts/${post.id}`, post)
  }


  DeleteUserPosts(id:number){

    this._HttpClient.get<UserPosts[]>(`http://localhost:3000/posts?userId=${id}`).subscribe({
      next : (userPosts) => {

        userPosts.forEach( post => {
          this.deletePost(post.id).subscribe({
            next : () => {},
            error: () => {}
          })

        })  
      }   
    })  
  }
}