import { UsersService } from './../../services/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from '../../models/iusers';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {

  usersService = inject(UsersService)
  router = inject(Router)
  users : IUsers[]= [];
  error : String = ""

 loginForm = new FormGroup({
      userName : new FormControl(null , [Validators.required]),
      userPassword : new FormControl(null , [Validators.required])
  })

  

  ngOnInit(){
    this.usersService.getUsers().subscribe({
      next : (data) => {
        this.users = data;
        console.log(this.users);
        
      }
    })
  }




  login(loginForm : FormGroup){


    loginForm.markAllAsTouched();

    for (let i = 0; i < this.users.length; i++) {
      
      if(this.users[i].userName.toLocaleLowerCase() === loginForm.get('userName')?.value.toLocaleLowerCase() && this.users[i].password == loginForm.get('userPassword')?.value){
       
        this.router.navigate(['posts']);
        localStorage.setItem('loggedUser',JSON.stringify(this.users[i]));
        
        this.usersService.loggedUser.next(this.users[i])  

        break;
      }
      
    }
    this.error = "Invalid UserName or Password"

  }

}
