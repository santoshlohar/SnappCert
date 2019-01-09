import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	loggedIn = false;

	constructor() { }

	isAuthenticated() {
		const observable = new Observable();

		observable.subscribe(() => {

		});
	}

	login() {
		this.loggedIn = true;
	}

	logout() {
		this.loggedIn = false;
	}
}
