import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-authorized-users',
	templateUrl: './authorized-users.component.html',
	styleUrls: ['./authorized-users.component.css']
})
export class AuthorizedUsersComponent implements OnInit {
	private data : any; 
	constructor() { }

	ngOnInit() {
		this.data = [
			{ 
				'role': 'Data Admin', 
				'name': 'Sushmita', 
				'emailId': 'admin@gmail.com', 
				'phone': '7839203844', 
				'status': 'Active'
			}
		]
	}



}
