import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCloseAPIComponent } from './auth-close-api.component';

describe('AuthCloseAPIComponent', () => {
  let component: AuthCloseAPIComponent;
  let fixture: ComponentFixture<AuthCloseAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCloseAPIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCloseAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
