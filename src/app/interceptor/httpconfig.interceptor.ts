import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../services/error-dialog.service';

import { 
	HttpInterceptor,
	HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
	HttpClient,
	HttpHeaders
} from '@angular/common/http';


import { Observable, Subject, throwError } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Injectable() 
export class HttpConfigInterceptor implements HttpInterceptor { 

	constructor(public errorDialogService: ErrorDialogService,
				public dialog: MatDialog,
				public http: HttpClient,
				public authService: AuthService) { }


	private _refreshSubject: Subject<any> = new Subject<any>();

	private _ifTokenExpired() {
		this._refreshSubject.subscribe({
			complete: () => {
				this._refreshSubject = new Subject<any>();
			}
		});
		if (this._refreshSubject.observers.length === 1) {
			// Hit refresh-token API passing the refresh token stored into the request
			// to get new access token and refresh token pair
			this.authService.token().subscribe(this._refreshSubject);
		}
		return this._refreshSubject;
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).pipe(
			catchError((response: HttpErrorResponse) => {
				let data = {};
				
				let status = response.status;
				let url = response.url;
				
				let showDialog = false;

				if(status == 500) {	
					showDialog = true;

					if( url.indexOf('/user/token') !== -1) {
						this.authService.logout(); // GO TO LOGIN PAGE
					}
				} else if(status == 401) {
					if( url.indexOf('/user/token') !== -1) {
						this.authService.logout(); // GO TO LOGIN PAGE
					} else {
						return this._ifTokenExpired().pipe(
							switchMap(() => {
								return next.handle(this.updateHeader(request));
							})
						);
						
					}
				}

				if(showDialog) {
					data = {
						reason: response.error.errors[0].msg,
						status: response.status
					};
					this.dialog.closeAll();
					this.errorDialogService.openDialog(data);
				}
				
                return throwError(response);
               
			})
		);
	}

	updateHeader(req) {
		console.log("--- update header --- ");
		let xApiToken = this.authService.getAccessToken();
		req = req.clone({
			headers: req.headers.set("x-api-token", xApiToken)
		});
		return req;
	}
}