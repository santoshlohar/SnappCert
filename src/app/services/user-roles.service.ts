import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UserRolesService {

	constructor(private http: HttpClient,
				private router: Router) { }

	roles = {
		systemAdmin: 'SYSTEM_ADMIN',
		requester: 'REG_REQESTER',
		kycAgent: 'KYC_AGENT',
		insAdmin: 'INST_ADMIN',
		insDataMgr: 'INS_DATA_MANAGER',
		dataReviewer: 'DATA_REVIEWER',
		dataApprover: 'DATA_APPROVER',
		dataCertifier: 'DATA_CERTIFIER',
		student: 'STUDENT'
	}

	renderScreen(role) {

		if(role == 'SYSTEM_ADMIN') {
			this.router.navigate(['/home']);
		} else if(role == 'REG_REQESTER') {
			this.router.navigate(['/home']);
		} else if(role == 'KYC_AGENT') {
			this.router.navigate(['/institutes']);
		} else if(role == 'INST_ADMIN') {
			this.router.navigate(['/','departments']);
		} else if(role == 'INS_DATA_MANAGER') {
			this.router.navigate(['/','courses']);
		} else if(role == 'DATA_APPROVER') {
			this.router.navigate(['/home']);
		} else if(role == 'DATA_CERTIFIER') {
			this.router.navigate(['/home']);
		} else if(role == 'STUDENT') {
			this.router.navigate(['/home']);
		} 
	}
}
