import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard';
import { Role } from './modals/role';
import { Entity } from './modals/entity';

import { HomeComponent } from './home/home.component';

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
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes =  [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'forgotPassword', component: ForgotPasswordComponent},
    { path: 'registration', component: InstituteRegistrationComponent},
    { path: 'resetPassword', component: ResetPasswordComponent},
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                        Role.Admin,
                        Role.Manager,
                        Role.Reviewer,
                        Role.Certifier,
                        Role.Approver,
                        Role.Student
                    ],
                entity: [
                    Entity.Institute,
                    Entity.Affiliate
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
                    Role.Manager
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
                    Role.Manager
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
                    Role.Admin
                ],
                entity: [
                    Entity.Institute
                ]
        }
    },
    { 
        path: 'departmentAdd', 
        component: DepartmentAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Admin
                ],
                entity: [
                    Entity.Institute
                ]
        }
    },
	{ 
        path: 'affInstitutes', 
        component: AffInstituteListComponent,
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Admin
                ],
                entity: [
                    Entity.Institute
                ]
        }
    },
	{ 
        path: 'affInstituteAdd', 
        component: AffInstituteAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Admin
                ],
                entity: [
                    Entity.Institute
                ]
        }
    },
	{ 
        path: 'courses', 
        component: CoursesListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager
                ],
                entity: [
                    Entity.Institute,
                    Entity.Affiliate
                ]
        }
    },
    { 
        path: 'courseAdd', 
        component: CourseAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager
                ],
                entity: [
                    Entity.Institute
                ] 
        }
    },
    { 
        path: 'courseEdit/:id', 
        component: CourseEditComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager
                ],
                entity: [
                    Entity.Institute
                ] 
        }
    },
    { 
        path: 'certificateUploadList', 
        component: CertificateUploadListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager
                ],
                entity: [
                    Entity.Institute
                ] 
        }
    },
    { 
        path: 'certificates', 
        component: CertificatesListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager,
                    Role.Reviewer,
                    Role.Certifier            
                ],
                entity: [
                    Entity.Institute
                ]
        }
    },
    { 
        path: 'certificateView/:certificateId', 
        component: CertificateViewComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager,
                    Role.Reviewer,
                    Role.Certifier                 
                ],
                entity: [
                    Entity.Institute
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
                    Role.Manager,
                    Role.Reviewer,
                    Role.Approver                 
                ],
                entity: [
                    Entity.Institute,
                    Entity.Affiliate
                ] 
        }
    },
    { 
        path: 'studentView/:studentId', 
        component: StudentViewComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager,
                    Role.Reviewer,
                    Role.Approver                 
                ],
                entity: [
                    Entity.Institute,
                    Entity.Affiliate
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