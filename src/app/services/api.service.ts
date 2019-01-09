import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, tap, catchError} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	apiURL: string = 'http://localhost:3000/api/v1';
	getData;

	constructor(private http: HttpClient) { }

	post(url, data) {
		return this.http.post(this.apiURL + url, data);
	}

	get(url) {
		this.getData = this.http.get(this.apiURL + url, { observe: 'response'});
		return this.getData;		
	}
}
