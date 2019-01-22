import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, map } from 'rxjs/operators';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private apiService: ApiService,
				public globals: Globals,
				private router: Router) { }

	login(data) {
		return this.apiService.post('/authenticateUser', data)
					.pipe(
						map((user) => {
							console.log(user);
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
}
