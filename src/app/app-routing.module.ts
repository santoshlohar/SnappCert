import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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
import { CertificateUploadListComponent } from './certificates/certificate-upload-list/certificate-upload-list.component';
import { CerificatesUploadComponent } from './certificates/cerificates-upload/cerificates-upload.component';

const routes: Routes =  [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registration', component: InstituteRegistrationComponent},
    { path: 'institutes', component: InstitutesListComponent, canActivate: [AuthGuard]},
    { path: 'instituteUpdate/:instId', component: InstituteUpdateComponent },
    { path: 'departments', component: DepartmentsListComponent },
    { path: 'departmentAdd', component: DepartmentAddComponent},
	{ path: 'affInstitutes', component: AffInstituteListComponent},
	{ path: 'affInstituteAdd', component: AffInstituteAddComponent},
	{ path: 'courses', component: CoursesListComponent, canActivate: [AuthGuard]},
    { path: 'courseAdd', component: CourseAddComponent},
    { path: 'certificateUploadList', component: CertificateUploadListComponent, canActivate: [AuthGuard]},
	{ path: 'certificateUpload', component: CerificatesUploadComponent, canActivate: [AuthGuard]},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }