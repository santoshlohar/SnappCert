import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    UploadCertificateDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
