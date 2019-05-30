import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	affiliateId: String;

	constructor() { }

	setIds(data) {
		localStorage.setItem("ids", JSON.stringify(data));
	};

	getIds() {
		return JSON.parse(localStorage.getItem('ids'));
	};

	public removeIds() {
		localStorage.removeItem('ids');
	}
}