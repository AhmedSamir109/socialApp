import { Component, inject, Input, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { IUsers } from '../../models/iusers';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{


  users : IUsers[] |null = null ;
  @Input() user:IUsers | null = null ;
  @Input() date = new Date();


  constructor(private _PostService: PostService , private _UsersService: UsersService){}

  ngOnInit(): void {
   
    this._UsersService.getUsers().subscribe({
      next: data => this.users = data 
    })

  }

  // @Input() date = new Date();
  // @Input() postId = 0 ;
  // @Input() userId = 0 ;

  // user : IUsers = {
  //   id:0,
  //   userName:'',
  //   userImg:'',
  //   password:''
  // }

  // ngOnInit(): void {
  //   const user = this._userServices.users.find(user => user.id == this.userId)

  //   if(user){
  //     this.user = user ;
  //   }
    
  // }

  // DeletePost(){
  //   console.log(this.postId);    
  //   this._postService.DeletPost(this.postId)
  // }

}
