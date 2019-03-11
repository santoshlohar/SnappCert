import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CertificateService } from '../certificate.service';

@Component({
	selector: 'app-certificate-view',
	templateUrl: './certificate-view.component.html',
	styleUrls: ['./certificate-view.component.css']
})
export class CertificateViewComponent implements OnInit {

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
		completionDate: ''
	};
	institute = {
		instituteType: '',
		instituteId: '',
		instituteName: '',
		location: '',
		website: '',
		affiliatedTo: '',
		affiliatedInstituteType: '',
		recognizedBy: ''
	};
	url;
	course = {
		Course_Name: '',
		Course_Duration: '',
		Duration_Unit: ''

	};
	constructor(private apiService: ApiService,
				private route: ActivatedRoute,
				private service: CertificateService) { 
					this.certificateId = this.route.snapshot.params['certificateId'];
				}

	ngOnInit() {
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
						console.log(this.certificate)
						this.instituteId  = this.certificate.instituteID;
						setTimeout(() => {
							this.getInstitute();
							this.getCourse();
						}, 500)
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

	getInstitute() {
		this.url = "/institutes/";
		var params = '';
		this.apiService.get(this.url+this.instituteId, params) 
			.subscribe((response) => {
				if(response.message == 'success') {
					if(response.data) {
						this.institute = response.data;
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

	getCourse() {
		this.url = "/coursedata/";
		console.log(this.certificate.courseID);
		var data;
		var Course_ID = this.certificate.courseID
		console.log(this.url);
		this.apiService.get(this.url + Course_ID, data)
			.subscribe((response) => {
				console.log(response);
				if(response.message == 'success') {
					if(response.data) {
						this.course = response.data[0];
					}
				} else {
					alert("Failed to get course data! Please try again.");
				}
			},
			(error) => {
				console.log(error);
			});
	}

}
