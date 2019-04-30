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

	renderScreen(role) {
		console.log(role)
		if(role == Role.Admin) {
			this.router.navigate(['/home']);
		} else if(role == Role.Requester) {
			this.router.navigate(['/home']);
		} else if(role == Role.Agent) {
			this.router.navigate(['/institutes']);
		} else if(role == Role.InsAdmin) {
			this.router.navigate(['/dashboard']);
		} else if(role == Role.InsDataMgr) {
			this.router.navigate(['/dashboard']);
		} else if(role == Role.AffInsDataMgr) {
			this.router.navigate(['/dashboard']);
		} else if(role == Role.InsRev) {
			this.router.navigate(['/dashboard']);
		} else if(role == Role.AffInsRev) {
			this.router.navigate(['/dashboard']);
		} else if(role == Role.DataCert) {
			this.router.navigate(['/dashboard']);
		} else if(role == Role.DataApp) {
			this.router.navigate(['/dashboard']);
		} else if(role == Role.Student) {
			this.router.navigate(['/home']);
		} 
	}
}
