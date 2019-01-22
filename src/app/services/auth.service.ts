import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private apiService: ApiService) { }

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
		
	}
}
