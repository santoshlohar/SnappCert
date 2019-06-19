import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable({
	providedIn: 'root'
})
export class StudentDataService {

	constructor(public apiService: ApiService) { }

	changeStatus(url, data) {
		console.log("url", url);
		console.log("data", data);

		this.apiService.put(url, data)
			.subscribe((response: any) => {
				if(response.success == true) {
					console.log(response);
				}
			})
	};
}
