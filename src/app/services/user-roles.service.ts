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
		affInsDataMgr: 'AFF_INS_DATA_MANAGER',
		dataReviewer: 'DATA_REVIEWER',
		dataApprover: 'DATA_APPROVER',
		dataCertifier: 'DATA_CERTIFIER',
		student: 'STUDENT'
	}

	renderScreen(role) {

		if(role == this.roles.systemAdmin) {
			this.router.navigate(['/home']);
		} else if(role == this.roles.requester) {
			this.router.navigate(['/home']);
		} else if(role == this.roles.kycAgent) {
			this.router.navigate(['/institutes']);
		} else if(role == this.roles.insAdmin) {
			this.router.navigate(['/departments']);
		} else if(role == this.roles.insDataMgr) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.affInsDataMgr) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.dataReviewer) {
			this.router.navigate(['/home']);
		} else if(role == this.roles.dataApprover) {
			this.router.navigate(['/home']);
		} else if(role == this.roles.dataCertifier) {
			this.router.navigate(['/home']);
		} else if(role == this.roles.student) {
			this.router.navigate(['/home']);
		} 
	}
}
