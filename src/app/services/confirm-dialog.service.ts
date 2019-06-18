import { Injectable, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ConfimationDialogComponent } from '../dialogs/confimation-dialog/confimation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {

	@Output() dialogResult: Boolean;
    constructor(public dialog: MatDialog) {
	 }

    openDialog(message): void {
		const dialogConfig = new MatDialogConfig();
		const dialogRef = this.dialog.open(ConfimationDialogComponent, {
			width: '250px',
			data: message
		});

		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			id: 1,
			title: 'Angular For Beginners'
		};

		dialogRef.afterClosed().subscribe(result => {
			console.log(`Dialog closed: ${result}`);
			this.dialogResult = result;
		});

		
	}
}
