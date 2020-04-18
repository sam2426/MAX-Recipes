import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        const path = state.url;
        if (path === '/recipe') {
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        }
        if (path === '/auth') {
          if (!isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/recipe']);
        }
      })
    );
  }
}









































// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map, take } from 'rxjs/operators';

// import { AuthService } from './auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

//     constructor(private authService: AuthService, private router:Router) { }

//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot)
//         : boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
//             // console.log("*-*-*-*-*-*-*-*-*-",route.url[0].path);

//         const path= route.url[0].path;
//         if(path === 'recipe'){
//         return this.authService.user.pipe(
//             take(1),
//             map(user => {
//                 // return !!user;

//                 const isAuth=!!user;
//                 if(isAuth){
//                     return true;
//                 }
//                 return this.router.createUrlTree(['/auth']);
//             }),
//             // tap(isAuth=>{
//             //     if(!isAuth){
//             //         this.router.navigate(['/auth']);
//             //     }
//             // })
//             //the commented method also correct, but in some rare cases it can cause race condition,
//             //and multiple urls are triggered. so the above urltree is used, which is new technique and preferred by angular
//             // for this use case.
//         )}
//         if(path==='auth'){
//             return this.authService.user.pipe(
//                 take(1),
//                 map(user => {
//                     // return !!user;

//                     const isAuth=!!user;
//                     if(!isAuth){
//                         return true;
//                     }
//                     return this.router.createUrlTree(['/recipe']);
//                 })
//             )
//         }
//     }
// }
