import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-6-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';

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
import { AuthorizedUsersComponent } from './authorized-users/authorized-users.component';
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
		AuthorizedUsersComponent,
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
		SidebarComponent,
		HeaderComponent,
		ChangePasswordComponent
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
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true }
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
