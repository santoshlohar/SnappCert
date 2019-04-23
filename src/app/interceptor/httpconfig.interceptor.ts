import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../services/error-dialog.service';

import { 
	HttpInterceptor,
	HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

@Injectable() 
export class HttpConfigInterceptor implements HttpInterceptor { 

	constructor(public errorDialogService: ErrorDialogService,
				public dialog: MatDialog) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token: string = localStorage.getItem('token');

		if(token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
		}
		
		if(!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
		}
		
		request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

		return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
			}),
			catchError((error: HttpErrorResponse) => {
				let data = {};
				console.log(error)
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
				};
				this.dialog.closeAll();
                this.errorDialogService.openDialog(data);
                return throwError(error);
			})
		);
	}
}