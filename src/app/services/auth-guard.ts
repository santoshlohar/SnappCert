import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Role } from '../modals/role';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService,
				private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
		const allowedRoles: any = route.data.roles;
		const isAuthorized = this.authService.isAuthorized(allowedRoles);
		
		if (!isAuthorized) {
			this.router.navigate(['/accessdenied']);
		}
	  
		return isAuthorized;
	}

}