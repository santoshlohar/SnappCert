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
		insAdmin: 'institute_admin',
		insDataMgr: 'INS_DATA_MANAGER',
		affInsDataMgr: 'AFF_INS_DATA_MANAGER',
		instReviewer: 'INST_REVIEWER',
		affInstReviewer: 'AFF_INST_REVIEWER',
		dataCertifier: 'DATA_CERTIFIER',
		dataApprover: 'DATA_APPROVER',
		student: 'STUDENT'
	}

	renderScreen(role) {
		console.log(role)
		if(role == this.roles.systemAdmin) {
			this.router.navigate(['/home']);
		} else if(role == this.roles.requester) {
			this.router.navigate(['/home']);
		} else if(role == this.roles.kycAgent) {
			this.router.navigate(['/institutes']);
		} else if(role == this.roles.insAdmin) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.insDataMgr) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.affInsDataMgr) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.instReviewer) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.affInstReviewer) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.dataCertifier) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.dataApprover) {
			this.router.navigate(['/dashboard']);
		} else if(role == this.roles.student) {
			this.router.navigate(['/home']);
		} 
	}
}
