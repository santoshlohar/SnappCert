import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material-module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './services/api.service';
import { Globals } from './globals';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
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

@NgModule({
    declarations: [
        AppComponent,
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
        CoursesListComponent
    ],
    imports: [
        BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule
    ],
    providers: [
		ApiService,
		Globals,
		{ provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
