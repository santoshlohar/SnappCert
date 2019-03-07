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
		this.apiService.get(this.url+ this.certificateId)
			.subscribe((response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			})
	}

}
