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

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
		const allowedRoles: any = route.data.roles;
		const allowedEntity: any = route.data.entity;
		
		const isAuthorized = this.authService.isAuthorized(allowedRoles,allowedEntity);
		
		if (!isAuthorized) {
			this.router.navigate(['/accessdenied'], { queryParams: { returnUrl: state.url }});
			return false;
		}
		return isAuthorized;
	}

}