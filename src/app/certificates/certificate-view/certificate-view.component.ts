import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-certificate-view',
	templateUrl: './certificate-view.component.html',
	styleUrls: ['./certificate-view.component.css']
})
export class CertificateViewComponent implements OnInit {

	loggedInUser;
	role;
	entity;
	certificateId;
	affiliateId;
	batchId;
	certificate = {
		institute : {
			type: '',
			instituteId: '',
			name: '',
			location: '',
			website: '',
			affiliateInstitute: {
				approvedBy: ''
			}
		},
		certificateId: '',
		batch: {
			start: ''
		}
	};
	url;
	course = {};
	reviewers;
	constructor(private apiService: ApiService,
				private route: ActivatedRoute,
				private location: Location,
				public dataService: DataService) { 
					this.certificateId = this.route.snapshot.params['certificateId'];
				}

	ngOnInit() {
		this.loggedInUser = JSON.parse(localStorage.getItem('user'));
		this.role = this.loggedInUser.reference.role;
		this.entity = this.loggedInUser.reference.entity;
		this.affiliateId = this.dataService.getAffiliate();
		this.batchId = this.dataService.getBatch();
		this.certificateId = this.route.snapshot.params['certificateId'];
		this.getCertificate();	
	}

	getCertificate() {
		this.url = "/certificate/" + this.certificateId;

		var params = new HttpParams();
		params = params.append('instituteId', this.loggedInUser.reference.instituteId);
		params = params.append('departmentId', this.loggedInUser.reference.departmentId);
		params = params.append('affiliateId', this.affiliateId);
		params = params.append('batchId', this.batchId);

		this.apiService.get(this.url, params)
			.subscribe((response: any) => {
				if(response.success == true) {
					this.certificate = response.data.certificate;
					console.log(this.certificate);
				}
			});
	}

	certify(status) {
		this.url = "/certificate/"+ this.certificateId + "/certifier/status";
		var data = {
			status: status
		}

		this.apiService.put(this.url, data)
			.subscribe((response: any) => {
				if(response.success == true) {
					console.log(response.data);
					this.getCertificate();
				}
			})
	};

	goBack() {
		this.location.back();
	}
}
