import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwtModule } from '@auth0/angular-jwt';

import { Globals } from './globals';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

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
import { PwdGenerateComponent } from './pwd-generate/pwd-generate.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { NotifyOtpComponent } from './dialog-boxes/notify-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UploadedBatchesComponent } from './uploaded-batches/uploaded-batches.component';
import { BatchUploadListComponent } from './uploaded-batches/batch-upload-list/batch-upload-list.component';
import { StudentUploadListComponent } from './uploaded-batches/student-upload-list/student-upload-list.component';
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CertificateViewComponent } from './certificates/certificate-view/certificate-view.component';
import { CertificatesListComponent } from './certificates/certificates-list/certificates-list.component';
import { BatchesComponent } from './batches/batches.component';
import { BatchListComponent } from './batches/batch-list/batch-list.component';
import { StudentListComponent } from './batches/student-list/student-list.component';
import { BatchViewComponent } from './batches/batch-view/batch-view.component';
import { StudentViewComponent } from './batches/student-view/student-view.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';

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
        PwdGenerateComponent,
        VerifyOtpComponent,
        NotifyOtpComponent,
        ForgotPasswordComponent,
        DashboardComponent,
        UsersListComponent,
        UserAddComponent,
        UploadedBatchesComponent,
        BatchUploadListComponent,
        StudentUploadListComponent,
        CourseEditComponent,
        CertificateViewComponent,
        CertificatesListComponent,
        BatchesComponent,
        BatchListComponent,
        StudentListComponent,
        BatchViewComponent,
        StudentViewComponent,
        AccessDeniedComponent,
        UserEditComponent
    ],
    imports: [
        BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
        HttpClientModule,
        AngularFontAwesomeModule,
        FlexLayoutModule,
        JwtModule.forRoot({
            config : {
                tokenGetter: function tokenGetter() {
                    var token = localStorage.getItem('access_token');
                    return  token;
                },
                whitelistedDomains: ["http:localhost:3000"]
            }
        })
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
