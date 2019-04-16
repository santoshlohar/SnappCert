import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private router: Router,
				public dialog: MatDialog) { }

	ngOnInit() {
	}

	gotoLogin() {
		this.router.navigate(['/login']);
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(LoginComponent, {
			width: '350px',
			height: '385px'
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
		});
	}

}
