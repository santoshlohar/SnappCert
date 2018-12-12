import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit {
  addCourseForm: any = {};
  constructor() { }

  ngOnInit() {
  }

  addCourse(form: NgForm) {
    this.addCourseForm.addCourseFormAffliatedInstituteId = form.value.addCourseFormAffliatedInstituteId;
    this.addCourseForm.addCourseFormCourseId = form.value.addCourseFormCourseId;
    this.addCourseForm.addCourseFormCourseName = form.value.addCourseFormCourseName;
    this.addCourseForm.addCourseFormCourseDuration = form.value.addCourseFormCourseDuration;
    this.addCourseForm.addCourseFormTermType = form.value.addCourseFormTermType;
    this.addCourseForm.addCourseFormNoTerms = form.value.addCourseFormNoTerms;
    console.log(this.addCourseForm);
  }

}
