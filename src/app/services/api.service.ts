import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})

export class ApiService {

	apiURL: string = 'http://localhost:3000/api/v1';
	user;
	getData;
	putData;

	constructor(private http: HttpClient) {}

	post(url, data) {
		//console.log(this.httpOptions);
		return this.http.post(this.apiURL + url, data);
	}

	get(url) {
		//console.log(headers)
		this.getData = this.http.get(this.apiURL + url);
		return this.getData;		
	}

	put(url, data) {
		this.putData = this.http.put(this.apiURL + url, data);
		return this.putData;
	}

	getAccessToken() {
		this.user = localStorage.getItem('user');
		if(this.user.token){
			var accessToken = this.user.token;
			return accessToken;
		}
		return false;
	}

	// httpOptions: object = {
	// 	headers: new HttpHeaders({
	// 		'Content-Type': 'application/json',
	// 		'Authorization': this.getAccessToken()
	// 	})
	// };
	
}
