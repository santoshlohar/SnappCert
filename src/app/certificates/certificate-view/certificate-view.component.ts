import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../certificate.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-certificate-view',
	templateUrl: './certificate-view.component.html',
	styleUrls: ['./certificate-view.component.css']
})
export class CertificateViewComponent implements OnInit {
	id = '';
	loginUser;
	userType;
	certificateId;
	instituteId;
	certificate = {
		certificateID: '',
		instituteID: '',
		studentID: '',
		courseID: '',
		Specialization: '',
		scoreEarned: '',
		totalScore: '',
		CGPA: '',
		creditsEarned: '',
		completionDate: '',
		reviewer1ID: '',
		reviewer1Name: '',
		transactionStatus: '',
		instituteIdRef: {
			instituteType: '',
			instituteId: '',
			instituteName: '',
			location: '',
			website: '',
			affiliatedTo: '',
			affiliatedInstituteType: '',
			recognizedBy: ''
		},
		courseIDRef: {
			Course_Name: '',
			Course_Duration: '',
			Duration_Unit: '',
			certificateID: ''
		}
	};
	institute = {};
	url;
	course = {};
	reviewers;
	constructor(private apiService: ApiService,
				private route: ActivatedRoute,
				private service: CertificateService,
				private location: Location) { 
					this.certificateId = this.route.snapshot.params['certificateId'];
				}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.getCertificate();	
	}

	getCertificate() {
		this.url = "/certificates/";
		var params = '';
		this.apiService.get(this.url+ this.certificateId, params)
			.subscribe((response) => {
				if(response.message == 'success') {
					if(response.data) {
						this.certificate = response.data[0];
						this.institute = this.certificate.instituteIdRef;
						this.course = this.certificate.courseIDRef;
					} else {
						alert("This certificate ID is not Available in our database.");
					}
				} else {
					alert(response.error);
				}
			},
			(error) => {
				console.log(error);
			})		
	}

	reviewed() {
		console.log(this.certificate);
		this.url = "/certificate/";
		this.reviewers = JSON.parse(localStorage.getItem('reviewers'));
		if(this.reviewers.length > 1) {
			for(var i=0;i<this.reviewers.length;i++) {
				if(this.loginUser._id == this.reviewers[i]._id) {
					console.log(this.loginUser._id)
					this.certificate.reviewer1ID = this.loginUser._id;
					this.certificate.reviewer1Name = this.loginUser.UserName;
					this.certificate.transactionStatus = "Reviewed";
					console.log(this.certificate)
				}
			}
		}
		this.apiService.put(this.url+this.certificateId, this.certificate)
			.subscribe((response) => {
				console.log(response)
			},
			(error) => {
				console.log(error);
			})
	}

	goBack() {
		this.location.back();
	}
}
