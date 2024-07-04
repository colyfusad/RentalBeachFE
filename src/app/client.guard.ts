import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ClientGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    var userId: string = sessionStorage.getItem('currentUserId')

    if(userId == null || userId == ''){
      return this.router.navigateByUrl('/login')
    }

    return true;
  }
}

