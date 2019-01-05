import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffInsAuthUserComponent } from './add-aff-ins-auth-user.component';

describe('AddAffInsAuthUserComponent', () => {
  let component: AddAffInsAuthUserComponent;
  let fixture: ComponentFixture<AddAffInsAuthUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAffInsAuthUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAffInsAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
