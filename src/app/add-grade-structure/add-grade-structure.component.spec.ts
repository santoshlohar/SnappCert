import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGradeStructureComponent } from './add-grade-structure.component';

describe('AddGradeStructureComponent', () => {
  let component: AddGradeStructureComponent;
  let fixture: ComponentFixture<AddGradeStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGradeStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGradeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
