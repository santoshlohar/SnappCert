import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

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
	constructor(private apiService: ApiService,
				private route: ActivatedRoute) { 
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
				console.log(response);
				if(response.message == 'success') {
					if(response.data) {
						this.institute = response.data;
						console.log(this.institute)
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

	getCourse() {
		this.url = "/coursedata";
		var params = {
			Course_ID: this.certificate.courseID
		}
		this.apiService.get(this.url, params)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			})
	}

}
