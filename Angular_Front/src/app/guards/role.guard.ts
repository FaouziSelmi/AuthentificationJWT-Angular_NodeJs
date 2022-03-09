import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

import decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
 user={
   username: "",
   role:""
 }
  constructor(private authService: AuthService, public router: Router){}
  canActivate(route: ActivatedRouteSnapshot){
    const expectedRole=route.data['expectedRole'];
    const token=localStorage.getItem('token');
   if (token != null){
    console.log (decode(token));
    this.user=decode(token);
    console.log ('user role is :',this.user.role);
    if ( !this.authService.isAuth()||this.user.role !== expectedRole){
      console.log(" role not admin");
      this.router.navigate(['login']);
      return false;
    }
    return true;
   }
   return false;
  }
  
}
