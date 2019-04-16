import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CertificateService {

	baseURL: string = 'http://localhost:3000/api/v1';
	url;
	user;
	constructor(private http: HttpClient) { }

	header = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': this.getAccessToken()
	});

	param = new HttpParams();	

	getAccessToken() {
		this.user = JSON.parse(localStorage.getItem('user'));
		if(this.user.token){
			var accessToken = this.user.token;
			return accessToken;
		}
		return false;
	}

	getCourse(id): Observable<any>  {
		this.url = "/coursedata/";
		this.param = this.param.append('Course_ID', id);
		console.log(this.param)
		return this.http.get(this.baseURL+ this.url + id, {headers: this.header, params: this.param})
			.pipe(
				map((response: Response) => {
					console.log(response);
					return response;
				},
				(error) => {
					console.log(error)
				})
			)
	}

}
