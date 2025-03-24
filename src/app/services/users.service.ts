import { inject, Injectable } from '@angular/core';
import { IUsers } from '../models/iusers';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users:IUsers[]=[] ;

  loggedUser: BehaviorSubject <IUsers | null> = new BehaviorSubject<IUsers | null>(null);

  constructor(private  _HttpClient : HttpClient , private _Router : Router){
   
    if(localStorage.getItem('loggedUser')){

      const storedUser = localStorage.getItem('loggedUser');
      
      if (storedUser) {
        this.loggedUser.next(JSON.parse(storedUser));
        _Router.navigate(['posts']);
      }

    }
  }

  Register(user:IUsers){
    return this._HttpClient.post('http://localhost:3000/users',user)
   }
 

  getUsers(){
     return this._HttpClient.get<IUsers[]>('http://localhost:3000/users')
  }

  
  changeUserData(user : IUsers):Observable<any>{
    return this._HttpClient.put(`http://localhost:3000/users/${user.id}` , user)
  }


  DeleteUser(id:number){
    return this._HttpClient.delete(`http://localhost:3000/users/${id}`);
  }



}
