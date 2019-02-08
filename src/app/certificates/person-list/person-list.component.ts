import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { PersonValidatorsService } from './person-validators.service';
import { Person } from './person';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-person-list',
  providers: [
    {provide: ValidatorService, useClass: PersonValidatorsService }
  ],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

	tableForm: FormGroup;
	displayedColumns = ['name', 'age', 'actionsColumn'];
	name = new FormControl();
	age = new FormControl();

	
	@Output() personListChange = new EventEmitter<Person[]>();

	dataSource = new TableDataSource<Person>(Element_Data);

	constructor(private personValidator: ValidatorService,
		private fb: FormBuilder) { 
			this.tableForm = this.fb.group({
				name: [{value: ''}, Validators.required],
				age: [{value: ''}, Validators.required],
			});
		}
	
	//dataSource = new MatTableDataSource<Person>(this.personList);

	ngOnInit() {
		console.log(this.dataSource);
		// this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);

		this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
	}

	// addData() {
	// 	this.dataSource.data = this.personList;
	// }
	

}

const Element_Data: Person[] = [
	
	{ name: 'Mark', age: 15 }

]
