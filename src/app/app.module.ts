import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ApiService } from './Services/api.service';
import { Globals } from './globals';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InstituteRegistrationComponent } from './institute-registration/institute-registration.component';
import { CreateIdComponent } from './create-id/create-id.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserLogComponent } from './user-log/user-log.component';
import { InstitutesKycComponent } from './institutes-kyc/institutes-kyc.component';
import { InstituteKycDetailsComponent } from './institute-kyc-details/institute-kyc-details.component';
import { AddAuthorizedUserComponent } from './add-authorized-user/add-authorized-user.component';
import { AffliatedInstitutesComponent } from './affliated-institutes/affliated-institutes.component';
import { AddAffliatedInstituteComponent } from './add-affliated-institute/add-affliated-institute.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ReviewBatchDataComponent } from './review-batch-data/review-batch-data.component';
import { UploadBatchDataComponent } from './upload-batch-data/upload-batch-data.component';
import { ReviewMarksheetDataComponent } from './review-marksheet-data/review-marksheet-data.component';
import { UploadMarksheetDataComponent } from './upload-marksheet-data/upload-marksheet-data.component';
import { ReviewCertificateDataComponent } from './review-certificate-data/review-certificate-data.component';
import { UploadCertificateDataComponent } from './upload-certificate-data/upload-certificate-data.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { AddInsAuthUserComponent } from './add-ins-auth-user/add-ins-auth-user.component';
import { AddAffInsAuthUserComponent } from './add-aff-ins-auth-user/add-aff-ins-auth-user.component';
import { AddAffInsCourseComponent } from './add-aff-ins-course/add-aff-ins-course.component';
import { AddInsDeptComponent } from './add-ins-dept/add-ins-dept.component';
import { AddGradeStructureComponent } from './add-grade-structure/add-grade-structure.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstituteDepartmentsComponent } from './institute-departments/institute-departments.component';
import { InsAuthUsersComponent } from './ins-auth-users/ins-auth-users.component';
import { AffInsAuthUsersComponent } from './aff-ins-auth-users/aff-ins-auth-users.component';
import { AffInsCourseDataComponent } from './aff-ins-course-data/aff-ins-course-data.component';
import { InsCoursesComponent } from './ins-courses/ins-courses.component';
import { EditInsDepartmentComponent } from './edit-ins-department/edit-ins-department.component';
import { EditAffInstituteComponent } from './edit-aff-institute/edit-aff-institute.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		InstituteRegistrationComponent,
		CreateIdComponent,
		ForgotPasswordComponent,
		UpdateProfileComponent,
		UserLogComponent,
		InstitutesKycComponent,
		InstituteKycDetailsComponent,
		AddAuthorizedUserComponent,
		AffliatedInstitutesComponent,
		AddAffliatedInstituteComponent,
		ViewCoursesComponent,
		AddCourseComponent,
		ReviewBatchDataComponent,
		UploadBatchDataComponent,
		ReviewMarksheetDataComponent,
		UploadMarksheetDataComponent,
		ReviewCertificateDataComponent,
		UploadCertificateDataComponent,
		HeaderComponent,
		SidebarComponent,
		ChangePasswordComponent,
		AddInsAuthUserComponent,
		AddAffInsAuthUserComponent,
		AddAffInsCourseComponent,
		AddInsDeptComponent,
		AddGradeStructureComponent,
		DashboardComponent,
		InstituteDepartmentsComponent,
		InsAuthUsersComponent,
		AffInsAuthUsersComponent,
		AffInsCourseDataComponent,
		InsCoursesComponent,
		EditInsDepartmentComponent,
		EditAffInstituteComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		DataTableModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule
		//AngularFontAwesomeModule
	],
	providers: [
		ApiService,
		Globals,
		{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
