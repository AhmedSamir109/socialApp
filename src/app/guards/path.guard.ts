import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const pathGuard: CanActivateFn = (route, state) => {
const usersServices= inject(UsersService);
const _Router = inject(Router);

  if(usersServices.loggedUser.value){
       return true ;
  }else{
       _Router.navigate(['/login'])
       return false ;
  }

};
