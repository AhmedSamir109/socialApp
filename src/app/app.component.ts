import { Component, OnInit } from '@angular/core';
import { IPost } from './models/ipost';
import { PostService } from './services/post.service';
import { UsersService } from './services/users.service';
import { IUsers } from './models/iusers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'socialApp';

  LoggedUser : IUsers | null = null;

  constructor(private _usersService:UsersService){
  }

  ngOnInit(): void {

    this._usersService.loggedUser.subscribe({
      next : (data) => {
          this.LoggedUser = data ;
  
      }
    })
  }

  
  
}
