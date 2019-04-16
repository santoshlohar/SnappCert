import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, catchError} from "rxjs/operators";
import { AuthService } from './auth.service';
import { Globals } from '../globals';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	baseURL: string = 'http://localhost:3000/api/v1';
	user;
	getData;
	putData;

	constructor(private http: HttpClient,
				private authService: AuthService,
				private globals: Globals) {
					
				}
	
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': this.authService.getAccessToken()
		}),
		params: new HttpParams({})
	};

	post(url, data) {
		return this.http.post(this.baseURL + url, data);
	};

	get(url, data) {
		this.getData = this.http.get(this.baseURL + url, this.httpOptions);
		return this.getData;		
	}

	put(url, data) {
		this.putData = this.http.put(this.baseURL + url, data);
		return this.putData;
	}
	
}
