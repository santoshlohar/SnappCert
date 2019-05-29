import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DataService {

	affiliateId: String;

	constructor() { }

	public setAffiliateId(id) {
		this.affiliateId = id;
	}
}
