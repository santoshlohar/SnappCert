import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-confimation-dialog',
    templateUrl: './confimation-dialog.component.html',
    styleUrls: ['./confimation-dialog.component.css']
})
export class ConfimationDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public message: string,
                public dialogRef: MatDialogRef<ConfimationDialogComponent>) { }

    ngOnInit() {
        //this.message = "Do you really want to delete this?"
    }

    close(): void {
        this.dialogRef.close();
    }

}
