import { Injectable } from '@angular/core';
import { AddCommentComponent } from './add-comment.component';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AddCommentService {

    constructor(public dialog: MatDialog,
				private dialogRef: MatDialogRef<AddCommentComponent>) { }

    openDialog(obj): Observable<AddCommentComponent> {
		var dialogConfig = new MatDialogConfig();
		dialogConfig.width = '415px';
		dialogConfig.disableClose = true;
		dialogConfig.autoFocus = true;
		dialogConfig.data = {
			url: obj.url,
			message: obj.message,
			status: obj.status,
			data: ''
		};
		const dialogRef = this.dialog.open(AddCommentComponent, dialogConfig);
		dialogRef.afterClosed()
			.pipe(
				map(result => !result ? 'Default data' : result)
			).subscribe(result => {
				dialogConfig.data.data = result;
			});
        
        console.log(dialogConfig.data)
		return dialogConfig.data;

    };
    
}
