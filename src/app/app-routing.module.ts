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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserAddComponent } from './users/user-add/user-add.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
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
import { Role } from './modals/role';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes =  [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'registration', component: InstituteRegistrationComponent},
    { path: 'resetPassword', component: ResetPasswordComponent},
    { path: 'generatePassword', component: PwdGenerateComponent},
    { path: 'verifyOtp', component: VerifyOtpComponent},
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                        Role.InsAdmin,
                        Role.InsDataMgr,
                        Role.AffInsDataMgr,
                        Role.InsRev,
                        Role.AffInsRev,
                        Role.DataCert,
                        Role.DataApp,
                        Role.Student
                    ] 
            } 
    },
    { 
        path: 'users', 
        component: UsersListComponent, 
        canActivate: [AuthGuard], 
        data: { 
                roles: [
                    Role.Admin,
                    Role.InsAdmin,
                    Role.InsDataMgr,
                    Role.AffInsDataMgr
                ] 
            } 
    },
    { 
        path: 'userAdd', 
        component: UserAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Admin,
                    Role.InsAdmin,
                    Role.InsDataMgr,
                    Role.AffInsDataMgr
                ] 
        }
    },
    { path: 'userEdit/:userId', component: UserEditComponent, canActivate: [AuthGuard]},
    { 
        path: 'institutes', 
        component: InstitutesListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Agent
                ] 
        }
    },
    { 
        path: 'instituteUpdate/:instId', 
        component: InstituteUpdateComponent,
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Agent
                ] 
        }
    },
    { 
        path: 'departments', 
        component: DepartmentsListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsAdmin
                ] 
        }
    },
    { 
        path: 'departmentAdd', 
        component: DepartmentAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsAdmin
                ] 
        }
    },
	{ 
        path: 'affInstitutes', 
        component: AffInstituteListComponent,
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsAdmin
                ] 
        }
    },
	{ 
        path: 'affInstituteAdd', 
        component: AffInstituteAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsAdmin
                ] 
        }
    },
	{ 
        path: 'courses', 
        component: CoursesListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsDataMgr,
                    Role.AffInsDataMgr
                ] 
        }
    },
    { 
        path: 'courseAdd', 
        component: CourseAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsDataMgr
                ] 
        }
    },
    { 
        path: 'courseEdit/:courseId', 
        component: CourseEditComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsDataMgr
                ] 
        }
    },
    { 
        path: 'certificateUploadList', 
        component: CertificateUploadListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsDataMgr
                ] 
        }
    },
    { 
        path: 'certificates', 
        component: CertificatesListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsDataMgr,
                    Role.InsRev,
                    Role.DataCert            
                ] 
        }
    },
    { 
        path: 'certificateView/:certificateId', 
        component: CertificateViewComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.InsDataMgr,
                    Role.InsRev,
                    Role.DataCert                 
                ] 
        }
    },
    { path: 'uploadedBatches', 
        component: UploadedBatchesComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: 'batchUploadList', component: BatchUploadListComponent},
            { path: 'studentUploadList', component: StudentUploadListComponent}
        ]
    },
    { path: 'batches', 
        component: BatchesComponent, 
        canActivate: [AuthGuard],
        children: [
            { path: 'batchList', component: BatchListComponent},
            { path: 'studentList', component: StudentListComponent}
        ]
    },
    { 
        path: 'batchView/:batchId', 
        component: BatchViewComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.AffInsDataMgr,
                    Role.AffInsRev,
                    Role.DataApp                 
                ] 
        }
    },
    { 
        path: 'studentView/:studentId', 
        component: StudentViewComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.AffInsDataMgr,
                    Role.AffInsRev,
                    Role.DataApp                 
                ] 
        }
    },
    { path: 'accessDenied', component: AccessDeniedComponent},
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