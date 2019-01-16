import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
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
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddInsAuthUserComponent } from './add-ins-auth-user/add-ins-auth-user.component';
import { AddAffInsAuthUserComponent } from './add-aff-ins-auth-user/add-aff-ins-auth-user.component';
import { AddAffInsCourseComponent } from './add-aff-ins-course/add-aff-ins-course.component';
import { AddInsDeptComponent } from './add-ins-dept/add-ins-dept.component';
import { AddGradeStructureComponent } from './add-grade-structure/add-grade-structure.component';
import { InstituteDepartmentsComponent } from './institute-departments/institute-departments.component';
import { InsAuthUsersComponent } from './ins-auth-users/ins-auth-users.component';
import { AffInsAuthUsersComponent } from './aff-ins-auth-users/aff-ins-auth-users.component';
import { AffInsCourseDataComponent } from './aff-ins-course-data/aff-ins-course-data.component';
import { InsCoursesComponent } from './ins-courses/ins-courses.component';
import { EditInsDepartmentComponent } from './edit-ins-department/edit-ins-department.component';

const routes: Routes = [
  { path : '', component : LoginComponent},
  // { path : 'login' , component : LoginComponent },
  { path : 'instituteRegistration' , component : InstituteRegistrationComponent },
  { path : 'createId' , component : CreateIdComponent },
  { path : 'forgotPassword' , component : ForgotPasswordComponent },
  { path : 'updateProfile' , component : UpdateProfileComponent },
  { path : 'userLog' , component : UserLogComponent },
  { path : 'institutesKyc' , component : InstitutesKycComponent },
  { path : 'instituteKycDetails/:id' , component : InstituteKycDetailsComponent },
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
  { path : 'changePassword', component : ChangePasswordComponent },
  { path : 'addInsAuthUser', component : AddInsAuthUserComponent },
  { path : 'addAffInsAuthUser', component : AddAffInsAuthUserComponent },
  { path : 'addAffInsCourse', component : AddAffInsCourseComponent},
  { path : 'addInsDept', component : AddInsDeptComponent},
  { path : 'addGradeStructure', component : AddGradeStructureComponent},
  { path : 'viewInstituteDepartments', component : InstituteDepartmentsComponent},
  { path : 'viewInstituteAuthUsers', component : InsAuthUsersComponent},
  { path : 'viewAffiliatedInstituteAuthUsers', component : AffInsAuthUsersComponent},
  { path : 'viewAffiliatedInstituteCourses', component : AffInsCourseDataComponent},
  { path : 'viewInstituteCourse', component : InsCoursesComponent},
  { path : 'editDepartment/:deptId', component : EditInsDepartmentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
