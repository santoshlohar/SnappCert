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
	
	public httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'x-api-token': this.authService.getAccessToken()
		})
	};

	post(url, data) {
		return this.http.post(this.baseURL + url, data, this.httpOptions);
	};

	get(url, params) {
		this.getData = this.http.get(this.baseURL + url, { headers: this.httpOptions.headers, params: params});
		return this.getData;		
	}

	put(url, data) {
		this.putData = this.http.put(this.baseURL + url, data, this.httpOptions);
		return this.putData;
	}

	upload(url, data) {
		let header = new HttpHeaders({
			'x-api-token': this.authService.getAccessToken()
		})

		this.getData = this.http.post(this.baseURL + url, data, { headers: header });
		return this.getData;
	}
	
}
