import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map, catchError} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	apiURL: string = 'http://localhost:3000/api/v1';

	constructor(private http: HttpClient) { }

	post(url, data) {
		// console.log(url);
		console.log(data);
		return this.http.post(this.apiURL + url, data);
			// .pipe(
			// 	map((data: any) => {
			// 		console.log("api service data===> "+data);
			// 		return data;
			// 	})); 
	}
}
