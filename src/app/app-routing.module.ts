import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';
import { InstituteRegistrationComponent } from './institute-registration/institute-registration.component';
import { PwdGenerateComponent } from './pwd-generate/pwd-generate.component';
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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
// import { BatchUploadListComponent } from './batches/batch-upload-list/batch-upload-list.component';
import { BatchesComponent } from './batches/batches.component';
import { BatchUploadListComponent } from './batches/batch-upload-list/batch-upload-list.component';
import { StudentUploadListComponent } from './batches/student-upload-list/student-upload-list.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CertificateViewComponent } from './certificates/certificate-view/certificate-view.component';
import { CertificatesListComponent } from './certificates/certificates-list/certificates-list.component';

const routes: Routes =  [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'registration', component: InstituteRegistrationComponent},
    { path: 'generatePassword', component: PwdGenerateComponent},
    { path: 'verifyOtp', component: VerifyOtpComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'users', component: UsersListComponent, canActivate: [AuthGuard]},
    { path: 'userAdd', component: UserAddComponent, canActivate: [AuthGuard]},
    { path: 'institutes', component: InstitutesListComponent, canActivate: [AuthGuard]},
    { path: 'instituteUpdate/:instId', component: InstituteUpdateComponent },
    { path: 'departments', component: DepartmentsListComponent, canActivate: [AuthGuard]},
    { path: 'departmentAdd', component: DepartmentAddComponent, canActivate: [AuthGuard]},
	{ path: 'affInstitutes', component: AffInstituteListComponent, canActivate: [AuthGuard]},
	{ path: 'affInstituteAdd', component: AffInstituteAddComponent, canActivate: [AuthGuard]},
	{ path: 'courses', component: CoursesListComponent, canActivate: [AuthGuard]},
    { path: 'courseAdd', component: CourseAddComponent, canActivate: [AuthGuard]},
    { path: 'courseEdit/:courseId', component: CourseEditComponent, canActivate: [AuthGuard]},
    { path: 'certificateUploadList', component: CertificateUploadListComponent, canActivate: [AuthGuard]},
    { path: 'certificates', component: CertificatesListComponent, canActivate: [AuthGuard]},
    { path: 'certificateUpload', component: CerificatesUploadComponent, canActivate: [AuthGuard]},
    { path: 'certificateView/:certificateId', component: CertificateViewComponent, canActivate: [AuthGuard]},
    {   path: 'batches', 
        component: BatchesComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: 'batchUploadList', component: BatchUploadListComponent},
            { path: 'studentUploadList', component: StudentUploadListComponent}
        ]
    },
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }