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
import { CourseEditComponent } from './courses/course-edit/course-edit.component';
import { CertificateViewComponent } from './certificates/certificate-view/certificate-view.component';
import { CertificatesListComponent } from './certificates/certificates-list/certificates-list.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CoursesMyComponent } from './courses/courses-my/courses-my.component';
import { BatchAddComponent } from './batches/batch-add/batch-add.component';
import { BatchListComponent } from './batches/batch-list/batch-list.component';
import { BatchEditComponent } from './batches/batch-edit/batch-edit.component';
import { StudentsUploadedComponent } from './students/students-uploaded/students-uploaded.component';
import { StudentsFinalComponent } from './students/students-final/students-final.component';

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
                ],
                entity: [
                    Entity.Institute,
                    Entity.Affiliate
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
                ],
                entity: [
                    Entity.Institute,
                    Entity.Affiliate
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
                    Role.Admin,
                    Role.Manager
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
        path: 'affiliateCourse/:affiliateId', 
        component: CoursesMyComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager
                ],
                entity: [
                    Entity.Affiliate
                ] 
        }
    },
    { 
        path: 'batchAdd', 
        component: BatchAddComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager
                ],
                entity: [
                    Entity.Affiliate
                ] 
        }
    },
    { 
        path: 'batchEdit/:id', 
        component: BatchEditComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager
                ],
                entity: [
                    Entity.Affiliate
                ] 
        }
    },
    { 
        path: 'batches', 
        component: BatchListComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager,
                    Role.Reviewer
                ],
                entity: [
                    Entity.Affiliate
                ] 
        }
    },
    { 
        path: ':batchId/uploadedStudents', 
        component: StudentsUploadedComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager,
                    Role.Reviewer
                ],
                entity: [
                    Entity.Affiliate
                ] 
        }
    },
    { 
        path: ':batchId/students', 
        component: StudentsFinalComponent, 
        canActivate: [AuthGuard],
        data: { 
                roles: [
                    Role.Manager,
                    Role.Reviewer
                ],
                entity: [
                    Entity.Affiliate
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