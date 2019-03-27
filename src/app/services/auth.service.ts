import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../modals/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	baseURL: string = 'http://localhost:3000/api/v1';

	user;
	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;
	
	constructor(public globals: Globals,
				private router: Router,
				private http: HttpClient) { 
					this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
					this.currentUser = this.currentUserSubject.asObservable();
					console.log("24" + JSON.parse(localStorage.getItem('user')));
				}
	
	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	login(data) {
		return this.http.post(this.baseURL+'/authenticateUser', data)
					.pipe(
						map((user: User) => {
							if(user && user['token']) {
								localStorage.setItem('user', JSON.stringify(user));
								this.globals.isUserLoggedIn = true;
								this.currentUserSubject.next(user);
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
