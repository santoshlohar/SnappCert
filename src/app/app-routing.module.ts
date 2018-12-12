import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path : 'login' , component : LoginComponent },
  { path : 'instituteRegistration' , component : InstituteRegistrationComponent },
  { path : 'createId' , component : CreateIdComponent },
  { path : 'forgotPassword' , component : ForgotPasswordComponent },
  { path : 'updateProfile' , component : UpdateProfileComponent },
  { path : 'userLog' , component : UserLogComponent },
  { path : 'institutesKyc' , component : InstitutesKycComponent },
  { path : 'instituteKycDetails/:id' , component : InstituteKycDetailsComponent },
  { path : 'authorizedUsers' , component : AuthorizedUsersComponent },
  { path : 'addAuthorizedUser' , component : AddAuthorizedUserComponent },
  { path : 'affliatedInstitutes' , component : AffliatedInstitutesComponent },
  { path : 'addAffliatedInstitute' , component : AddAffliatedInstituteComponent },
  { path : 'viewCourses' , component : ViewCoursesComponent },
  { path : 'addCourse' , component : AddCourseComponent },
  { path : 'reviewBatchData', component : ReviewBatchDataComponent },
  { path : 'uploadBatchData', component : UploadBatchDataComponent },
  { path : 'reviewMarksheetData', component : ReviewMarksheetDataComponent },
  { path : 'uploadMarksheetData', component : UploadMarksheetDataComponent },
  { path : 'reviewCertificateData', component : ReviewCertificateDataComponent },
  { path : 'uploadCertificateData', component : UploadCertificateDataComponent },
  { path : 'changePassword', component : ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
