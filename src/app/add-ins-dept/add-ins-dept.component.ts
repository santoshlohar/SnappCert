import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-ins-dept',
  templateUrl: './add-ins-dept.component.html',
  styleUrls: ['./add-ins-dept.component.css']
})
export class AddInsDeptComponent implements OnInit {

	insDeptForm: FormGroup;
	constructor(private _formBuilder: FormBuilder) { }
  
	ngOnInit() {
		this.insDeptForm = this._formBuilder.group({
			instituteId: ['', Validators.required],
			departmentId: ['', Validators.required],
			department: ['', Validators.required],
			dm1Name: ['', Validators.required],
			dm1Email: ['', Validators.required],
			dm1PhnNo: ['', Validators.required],
			dm2Name: '',
			dm2Email: '',
			dm2PhnNo: '',      
		});
	}

}
