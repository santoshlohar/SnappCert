import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError} from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	baseURL: string = 'http://localhost:3000/api/v1';
	user;
	getData;
	putData;
	data;

	constructor(private http: HttpClient,
				private authService: AuthService) {
				}

	post(url, data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'x-api-token': this.authService.getAccessToken()
		});
		return this.http.post(this.baseURL + url, data, { headers: headers });
	};

	get(url, params) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'x-api-token': this.authService.getAccessToken()
		});
		this.getData = this.http.get(this.baseURL + url, { headers: headers, params: params});
		return this.getData;		
	}

	put(url, data) {
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'x-api-token': this.authService.getAccessToken()
		});
		this.putData = this.http.put(this.baseURL + url, data, { headers: headers });
		return this.putData;
	}

	upload(url, data) {
		let header = new HttpHeaders({
			'x-api-token': this.authService.getAccessToken()
		});
		this.getData = this.http.post(this.baseURL + url, data, { headers: header });
		return this.getData;
	}
	
}
