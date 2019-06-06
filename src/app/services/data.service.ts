import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	affiliateId: String;

	constructor() { }

	setAffiliate(affiliateId) {
		localStorage.setItem("affiliateId", JSON.stringify(affiliateId));
	}

	setBatch(batchId) {
		localStorage.setItem("batchId", JSON.stringify(batchId));
	}

	getAffiliate() {
		return JSON.parse(localStorage.getItem('affiliateId'));
	};

	getBatch() {
		return JSON.parse(localStorage.getItem('batchId'));
	};

	public removeIds() {
		localStorage.removeItem('ids');
	}
}