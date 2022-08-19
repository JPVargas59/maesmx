import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';
import {UserService} from "../services/user.service";
import {Role, UserInfo} from "../models/UserInfo";
import {AuthService} from "../services/auth.service";
import {DatabaseService} from "../services/database.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanLoad {

  constructor(private databaseService: DatabaseService, private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roles = route.data?.['roles'] as Array<Role> ?? [];
    if (roles.length == 0) return true
    return new Promise( async (resolve, reject) => {
      const user = await firstValueFrom(this.databaseService.getUserInfo());
      if (roles.includes(user!.role)) return resolve(true)
      await this.router.navigate(['/student/home'])
      return resolve(false)
    })
  }
}
