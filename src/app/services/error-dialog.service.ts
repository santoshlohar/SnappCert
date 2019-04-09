import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class ErrorDialogService {

	constructor(public dialog: MatDialog) { 
	}

	openDialog(data): void {
		const dialogRef = this.dialog.open(ErrorDialogComponent, {
			width: '350px',
			height: '385px',
			data: data
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed!");
			console.log(result);
		});
	}

}
