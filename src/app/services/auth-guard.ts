import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				private router: Router) { }

	// canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    //     if(this.authService.isAuthenticated()) {
	// 		return true;
	// 	} 
    //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    //     return false;
	// }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
	: Observable<boolean> | Promise<boolean> | boolean {
		const currentUser = this.authService.currentUserValue;
		console.log("current" + currentUser);
		console.log("1")
		if(currentUser) {
			console.log("current" + currentUser);
			if(route.data.role && route.data.roles.indexOf(currentUser.UserType) === -1) {
				this.router.navigate(['/']);
                return false;
			}
			console.log("role" + route.data.role);
			
			return true;
		}
		console.log("3")
		this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
	}

}