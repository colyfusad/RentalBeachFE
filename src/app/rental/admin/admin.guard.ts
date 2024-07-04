import { Injectable, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  // export const authGuard: CanActivateFn = (route, state) => {
  //   return this.authService.isAuthorized;
  // };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    var userId: string = sessionStorage.getItem('currentAdminUserId')
  

  if(userId == null || userId == ''){
    return this.router.navigateByUrl('/admin/login')
  }

    return true;
  }




}
