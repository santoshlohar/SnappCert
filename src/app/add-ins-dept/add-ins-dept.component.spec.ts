import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsDeptComponent } from './add-ins-dept.component';

describe('AddInsDeptComponent', () => {
  let component: AddInsDeptComponent;
  let fixture: ComponentFixture<AddInsDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
