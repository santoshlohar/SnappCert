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
		this.url = "http://localhost:3000/api/v1/certificates/fileupload";
		// this.data = files[0];
		// console.log(this.data);

		this.data = {
			file: files[0],
			name: 'excelFile'
		}

		//form.append('upload[]',files[0], files[0].name)
		form.append('excelFile', files[0])

		console.log(form);
		this.http.post(this.url, form )
			.subscribe((response) => {
				console.log(response);
			});
		
		// this.apiService.post(this.url, this.data )
		// 	.subscribe((response) => {
		// 		console.log(response);
		// 	})

	}
}
