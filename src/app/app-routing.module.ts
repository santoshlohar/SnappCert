import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InstituteRegistrationComponent } from './institute-registration/institute-registration.component';
import { InstitutesListComponent } from './institutes/institutes-list/institutes-list.component';
import { InstituteUpdateComponent } from './institutes/institute-update/institute-update.component';
import { DepartmentsListComponent } from './departments/departments-list/departments-list.component';
import { DepartmentAddComponent } from './departments/department-add/department-add.component';
import { AffInstituteListComponent } from './affInstitutes/aff-institute-list/aff-institute-list.component';
import { AffInstituteAddComponent } from './affInstitutes/aff-institute-add/aff-institute-add.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';

const routes: Routes =  [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: InstituteRegistrationComponent},
    { path: 'institutes', component: InstitutesListComponent},
    { path: 'instituteUpdate/:instId', component: InstituteUpdateComponent },
    { path: 'departments', component: DepartmentsListComponent },
    { path: 'departmentAdd', component: DepartmentAddComponent},
	{ path: 'affInstitutes', component: AffInstituteListComponent},
	{ path: 'affInstituteAdd', component: AffInstituteAddComponent},
	{ path: 'courses', component: CoursesListComponent},
	{ path: 'courseAdd', component: CourseAddComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }