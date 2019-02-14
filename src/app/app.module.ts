import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { Globals } from './globals';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ValidatorService } from 'angular4-material-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { InstituteRegistrationComponent } from './institute-registration/institute-registration.component';
import { InstitutesListComponent } from './institutes/institutes-list/institutes-list.component';
import { InstituteUpdateComponent } from './institutes/institute-update/institute-update.component';
import { DepartmentsListComponent } from './departments/departments-list/departments-list.component';
import { DepartmentAddComponent } from './departments/department-add/department-add.component';
import { AffInstituteAddComponent } from './affInstitutes/aff-institute-add/aff-institute-add.component';
import { AffInstituteListComponent } from './affInstitutes/aff-institute-list/aff-institute-list.component';
import { CourseAddComponent } from './courses/course-add/course-add.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';
import { CertificateUploadListComponent } from './certificates/certificate-upload-list/certificate-upload-list.component';
import { CerificatesUploadComponent } from './certificates/cerificates-upload/cerificates-upload.component';
import { PwdGenerateComponent } from './pwd-generate/pwd-generate.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { NotifyOtpComponent } from './dialog-boxes/notify-otp.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HeaderComponent,
        SidebarComponent,
        HomeComponent,
        LoginComponent,
        InstituteRegistrationComponent,
        InstitutesListComponent,
        InstituteUpdateComponent,
        DepartmentsListComponent,
        DepartmentAddComponent,
        AffInstituteAddComponent,
        AffInstituteListComponent,
        CourseAddComponent,
        CoursesListComponent,
        CertificateUploadListComponent,
        CerificatesUploadComponent,
        PwdGenerateComponent,
        VerifyOtpComponent,
        NotifyOtpComponent,
        ForgotPasswordComponent,
        DashboardComponent 
    ],
    imports: [
        BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
        HttpClientModule,
        AngularFontAwesomeModule 
    ],
    providers: [
        AuthService,
		ApiService,
        Globals,
        {   
            provide: STEPPER_GLOBAL_OPTIONS, 
            useValue: { showError: true } 
        }
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
