import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	user;
	role;
	constructor() { }

	ngOnInit() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.role = this.user.reference.role;
	}

}
