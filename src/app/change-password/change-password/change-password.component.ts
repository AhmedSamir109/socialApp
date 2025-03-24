import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUsers } from '../../models/iusers';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

 changePassForm = new FormGroup({
  userName : new FormControl("" , Validators.required),
  userImg : new FormControl("" , Validators.required),
  password : new FormControl("" , Validators.required),
  newPassword: new FormControl("" , [Validators.required])
 })


 
loggedUser : IUsers = JSON.parse(localStorage.getItem("loggedUser") || '{}') as IUsers;
constructor(private _userServices:UsersService , private _Router:Router){}

 EditProfile(formData : FormGroup){
  
  formData.markAllAsTouched();

  if(formData.valid){

    this.loggedUser.userName = formData.value.userName ;
    this.loggedUser.userImg = formData.value.userImg ;
    this.loggedUser.password = formData.value.newPassword ;
    
    this._userServices.changeUserData(this.loggedUser).subscribe();

    this._Router.navigate(['posts']);
    localStorage.setItem("loggedUser" , JSON.stringify(this.loggedUser));
    this._userServices.loggedUser.next(this.loggedUser);

    this.showSweatAlert();

  }

 }

 showSweatAlert(){
  Swal.fire({
    icon: "success",
    title: "Your changes has been saved",
    showConfirmButton: false,
    timer: 2000
  });
 }

}
