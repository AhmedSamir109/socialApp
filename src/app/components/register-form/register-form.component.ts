import { UsersService } from './../../services/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsers } from '../../models/iusers';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent implements OnInit{

  users:IUsers[] = [];

  registerForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    userImg: new FormControl("", Validators.required),
    userPassword: new FormControl("", [Validators.required]),
  })

  usersService = inject(UsersService);
  _Router = inject(Router);

  ngOnInit(): void {

    this.usersService.getUsers().subscribe({
      next : (data) =>{
        this.users = data;
      }

    });
  }

  Register(registerForm: FormGroup) {

    console.log(this.users);
    
    registerForm.markAllAsTouched();

    if(registerForm.valid){
      const len = this.users.length;
      const id = len ? this.users[len-1].id : 1;

      console.log(id);
      


      const newUser = {
        id: id + 1,
        userName: this.registerForm.get('userName')?.value || '',
        userImg: this.registerForm.get('userImg')?.value || '',
        password: this.registerForm.get('userPassword')?.value || ''
      }

      this.usersService.Register(newUser).subscribe({
        next: () =>{
          console.log("success");
          this._Router.navigate(['login'])
        }
      });
    };
   
  };
}