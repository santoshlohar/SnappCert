import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { PersonValidatorsService } from './person-validators.service';
import { Person } from './person';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

	constructor(private personValidator: ValidatorService,
		private fb: FormBuilder) { }
	

	@Input() personList = [ 
		{ name: 'Mark', age: 15 },
		{ name: 'Brad', age: 50 },
		] ;
	@Output() personListChange = new EventEmitter<Person[]>();

	// dataSource: MatTableDataSource<Person[]>;
	dataSource = new MatTableDataSource<Person>(this.personList);

	ngOnInit() {
		this.tableForm = this.fb.group({
			name: [{value: ''}, Validators.required],
			age: [{value: ''}, Validators.required],
		});
		
		// this.dataSource = new TableDataSource<any>(this.personList, Person, this.personValidator);

		// this.dataSource.datasourceSubject.subscribe(personList => this.personListChange.emit(personList));
	}

	addData() {
		this.dataSource.data = this.personList;
	}
	

}
