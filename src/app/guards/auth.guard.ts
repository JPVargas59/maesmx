import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.authService.isLoggedIn()
        .then((isLoggedIn) => {
          console.log(isLoggedIn)
          if (isLoggedIn) {
            resolve(true);
          } else {
            this.router.navigate(['/auth/login']);
            resolve(false);
          }
        })
    })
  }
}
