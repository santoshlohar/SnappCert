import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../modals/role';

@Injectable({
	providedIn: 'root'
})
export class UserRolesService {

	constructor(private http: HttpClient,
				private router: Router) { }

	renderScreen(role, entity) {
		if(entity == 'institute') {
			if(role == 'admin') {
				this.router.navigate(['/dashboard']);
			} else if(role == 'manager') {
				this.router.navigate(['/dashboard']);
			} else if(role == 'reviewer') {
				this.router.navigate(['/dashboard']);
			} else if(role == 'certifier') {
				this.router.navigate(['/dashboard']);
			}
		} else if(entity == 'affiliate') {
			if(role == 'admin') {
				this.router.navigate(['/dashboard']);
			} else if(role == 'manager') {
				this.router.navigate(['/dashboard']);
			} else if(role == 'reviewer') {
				this.router.navigate(['/dashboard']);
			} else if(role == 'approver') {
				this.router.navigate(['/dashboard']);
			}
		}
	}
}
