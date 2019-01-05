import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInsAuthUserComponent } from './add-ins-auth-user.component';

describe('AddInsAuthUserComponent', () => {
  let component: AddInsAuthUserComponent;
  let fixture: ComponentFixture<AddInsAuthUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInsAuthUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInsAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
