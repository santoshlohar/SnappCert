import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffInsCourseComponent } from './add-aff-ins-course.component';

describe('AddAffInsCourseComponent', () => {
  let component: AddAffInsCourseComponent;
  let fixture: ComponentFixture<AddAffInsCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAffInsCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAffInsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
