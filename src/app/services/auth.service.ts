import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	apiURL: string = 'http://localhost:3000/api/v1';
	user;
	constructor(public globals: Globals,
				private router: Router,
				private http: HttpClient) { }

	login(data) {
		return this.http.post(this.apiURL+'/authenticateUser', data)
					.pipe(
						map((user) => {
							if(user && user['token']) {
								localStorage.setItem('user', JSON.stringify(user));
							}
							return user;	
						})
					)
	}

	logout() {
		localStorage.removeItem('user');
		this.globals.isUserLoggedIn = false;
		this.router.navigate(['/login']);
	}

	getAccessToken() {
		this.user = JSON.parse(localStorage.getItem('user'));
		if(this.user.token){
			var accessToken = this.user.token;
			return accessToken;
		}
		return false;
	}

	isAuthenticated(): boolean {
		this.user = JSON.parse(localStorage.getItem('user'));

		if(this.user.token){
			this.globals.isUserLoggedIn = true;
			return true;
		}
		return false;
	}

}
