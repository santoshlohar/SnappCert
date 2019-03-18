import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-batch-view',
	templateUrl: './batch-view.component.html',
	styleUrls: ['./batch-view.component.css']
})
export class BatchViewComponent implements OnInit {

	url;
	loginUser;
	userType;
	batchId;
	batch = {};
	constructor(private apiService: ApiService,
		private route: ActivatedRoute) { 
			this.batchId = this.route.snapshot.params['batchId'];
		}

	ngOnInit() {
		this.loginUser = JSON.parse(localStorage.getItem('user'));
		this.userType = this.loginUser.UserType;
		this.getBatchData();
	}

	getBatchData() {
		this.url = "/batch/";
		var data;
		this.apiService.get(this.url + this.batchId, data)
			.subscribe((response) => {
				console.log(response)
				if(response.message == 'success') {
					if(response.data) {
						this.batch = response.data;
					}
				}
			},
			(error) => {
				console.log(error);
			})
	}

}
