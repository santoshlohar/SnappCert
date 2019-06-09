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
		return  this.http.post(this.baseURL+'/user/signin', data)
					.pipe(
						map((result: any) => {
							if(result.success == true) {
								this.user = result.data;
								localStorage.setItem('user', JSON.stringify(this.user));
								
								this.currentUserSubject.next(this.user);
							}
							return this.user;	
						})
					)
	}

	token() {

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'refreshtoken' : this.getRefreshToken()
		})

		return this.http.post(this.baseURL+'/user/token', {}, { headers: headers })
							.pipe(
								map((result: any) => {
									if(result.success == true) {
										this.user = result.data;
										localStorage.setItem('user', JSON.stringify(this.user));
										
										this.currentUserSubject.next(this.user);
									}
									return this.user;	
								})
							)

	}

	logout() {
		localStorage.clear();
		this.currentUserSubject.next(null);
		this.router.navigate(['/']);
	}

	getAccessToken() {
		var user = JSON.parse(localStorage.getItem('user'));
		if( user && user.accessToken){
			var accessToken = user.accessToken;
			return accessToken;
		}
		return false;
	}

	getRefreshToken() {
		var user = JSON.parse(localStorage.getItem('user'));
		if( user && user.refreshToken){
			var refreshToken = user.refreshToken;
			return refreshToken;
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

	isAuthorized(allowedRoles: string, allowedEntity: string): boolean {

		if (allowedRoles == null || allowedRoles.length < 0 || allowedEntity == null || allowedEntity.length < 0) {
			return false;
		}

		const token = this.getAccessToken();
		const decodeToken = this.jwtHelperService.decodeToken(token);
		
		if (!decodeToken) {
			return false;
		}
		return  allowedRoles.includes(decodeToken['role']) &&
				allowedEntity.includes(decodeToken['entity']);
	}

	forgotPassword(data: object) {
		return	this.http.post(this.baseURL+'/user/forgotpassword', data)
				.pipe(
					map((result: any) => {
						return result;	
					})
				)
	}

	resetPassword(data: object) {
		return	this.http.post(this.baseURL+'/user/resetpassword', data)
				.pipe(
					map((result: any) => {
						return result;	
					})
				)
	}

}
