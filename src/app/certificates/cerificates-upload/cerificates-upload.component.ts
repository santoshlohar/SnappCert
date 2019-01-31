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
			'Content-Type':"multipart/form-data"
		})
	};

	uploadCertificate(files, filename) {
		console.log(files[0]);
		var form = new FormData();
		this.url = "/certificates/fileupload";

		form.append(filename, files[0]);
		
		this.apiService.post(this.url, form )
			.subscribe((response) => {
				console.log(response);
			})
	}
}
