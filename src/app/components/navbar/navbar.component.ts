import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUsers } from '../../models/iusers';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl:'./navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  loggedUser :IUsers  | null = null;

  constructor(private _UsersService:UsersService , private _postService:PostService , private _Router:Router){}
    
  ngOnInit(): void {
  
    this._UsersService.loggedUser.subscribe({
      next : (data) => {
        this.loggedUser = data;
      }
  })
}

  

  logout(){

    this._UsersService.loggedUser.next(null);
    
    localStorage.removeItem('loggedUser');

  }

  
  DeleteAccount(id:number){
    
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:  "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        
        if (result.isConfirmed) {

          Swal.fire({
            title: "Deleted!",
            text: "Your Account has been deleted.",
            icon: "success"
          });

          this._UsersService.DeleteUser(id).subscribe();
          this._postService.DeleteUserPosts(id);
          localStorage.removeItem("loggedUser");
          this._UsersService.loggedUser.next(null);
          this._Router.navigate(['login']);

         
        }

      });
  }

  // show(){
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor:  "#d33",
  //     cancelButtonColor: "#3085d6",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your Account has been deleted.",
  //         icon: "success"
  //       });
  //     }
  //   });

  // }


}