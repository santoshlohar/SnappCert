import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIdComponent } from './create-id.component';

describe('CreateIdComponent', () => {
  let component: CreateIdComponent;
  let fixture: ComponentFixture<CreateIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
