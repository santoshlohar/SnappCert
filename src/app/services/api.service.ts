import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError} from "rxjs/operators";
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	apiURL: string = 'http://localhost:3000/api/v1';
	user;
	getData;
	putData;

	constructor(private http: HttpClient,
				private authService: AuthService) {
					
				}

	post(url, data) {
		return this.http.post(this.apiURL + url, data);
	}

	get(url) {
		this.getData = this.http.get(this.apiURL + url, this.httpOptions);
		return this.getData;		
	}

	put(url, data) {
		this.putData = this.http.put(this.apiURL + url, data);
		return this.putData;
	}

	httpOptions: object = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': this.authService.getAccessToken()
		})
	};
	
}
