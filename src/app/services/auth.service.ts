import { Injectable, Output } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Globals } from '../globals';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../modals/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	baseURL: string = 'http://localhost:3000/api/v1';
	user;
	@Output() isUserLoggedIn: boolean = false;
	private currentUserSubject: BehaviorSubject<UserModel>;
	public currentUser: Observable<UserModel>;
	
	constructor(public globals: Globals,
				private router: Router,
				private http: HttpClient,
				private jwtHelperService: JwtHelperService
				) {
					this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('user')));
					this.currentUser = this.currentUserSubject.asObservable();
				}

	public get currentUserValue(): UserModel {
		console.log(this.currentUserSubject.value)
		return this.currentUserSubject.value;
	}


	login(data) {
		return this.http.post(this.baseURL+'/authenticateUser', data)
					.pipe(
						map((user: UserModel) => {
							if(user && user['token']) {
								localStorage.setItem('user', JSON.stringify(user));
								localStorage.setItem('access_token', user.token);
								this.currentUserSubject.next(user);
							}
							return user;	
						})
					)
	}

	logout() {
		localStorage.removeItem('user');
		localStorage.removeItem('access_token');
		this.currentUserSubject.next(null);
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

	isAuthorized(allowedRoles: string): boolean {

		if (allowedRoles == null || allowedRoles.length < 0) {
			return true;
		}

		const token = this.getAccessToken();
		const decodeToken = this.jwtHelperService.decodeToken(token);

		if (!decodeToken) {
			console.log('Invalid token');
			return false;
		}
		return allowedRoles.includes(decodeToken.data['role']);
	}

}
