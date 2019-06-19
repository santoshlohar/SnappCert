import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { StudentDataService } from 'src/app/students/student-data.service';
import { AddCommentService } from '../add-comment/add-comment.service';

@Component({
    selector: 'app-confimation-dialog',
    templateUrl: './confimation-dialog.component.html',
    styleUrls: ['./confimation-dialog.component.css']
})
export class ConfimationDialogComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public message: string,
                public dialogRef: MatDialogRef<ConfimationDialogComponent>,
                public studentDataService: StudentDataService,
                public addCommentService: AddCommentService) { }

    ngOnInit() {
    }

    afterClose() {
        this.dialogRef.afterClosed().subscribe((result) => {
            if(result == true) {
                var dialogData = this.dialogRef._containerInstance._config.data;
                var obj = {
                    status: dialogData.status
                };

                if(dialogData.status == "rejected") {
                    this.addCommentService.openDialog(dialogData);
                } else {
                    this.studentDataService.changeStatus(dialogData.url, obj);
                }
            }
        })
    };

    close() {
        this.dialogRef.close();
    }

}
