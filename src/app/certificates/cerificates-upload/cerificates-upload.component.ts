import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-cerificates-upload',
	templateUrl: './cerificates-upload.component.html',
	styleUrls: ['./cerificates-upload.component.css']
})
export class CerificatesUploadComponent implements OnInit {

	url;
	data;
	constructor(private apiService: ApiService,
		private http: HttpClient) { }

	ngOnInit() {
	}

	httpOptions = {
		headers: new HttpHeaders({
			'enctype':"multipart/form-data"
		})
	};

	uploadCertificate(files) {
		console.log(files[0]);
		this.url = "http://localhost:3000/api/v1/certificates/fileupload";
		this.data = files[0].name;

		this.http.post(this.url, this.data, this.httpOptions )
			.subscribe((response) => {
				console.log(response);
			});
		
		// this.apiService.post(this.url, this.data )
		// 	.subscribe((response) => {
		// 		console.log(response);
		// 	})

	}
}
