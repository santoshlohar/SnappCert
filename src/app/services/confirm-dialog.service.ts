import { Injectable, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ConfimationDialogComponent } from '../dialogs/confimation-dialog/confimation-dialog.component';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ConfirmDialogService {

	@Output() dialogResult: Boolean;
	constructor(public dialog: MatDialog,
		private dialogRef: MatDialogRef<ConfimationDialogComponent>) {
	 }

    openDialog(obj): Observable<ConfimationDialogComponent> {
		var dialogConfig = new MatDialogConfig();
		dialogConfig.width = '300px';
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			url: obj.url,
			message: obj.message,
			status: obj.status,
			data: '',
			batchId: obj.batchId
		};
		const dialogRef = this.dialog.open(ConfimationDialogComponent, dialogConfig);
		dialogRef.afterClosed()
			.pipe(
				map(result => !result ? 'Default data' : result)
			).subscribe(result => {
				dialogConfig.data.data = result;
			});

		return dialogConfig.data;

	};

	close() {
		this.dialogRef.afterClosed().subscribe((result) => {
			console.log(result);
		})
	}
}
