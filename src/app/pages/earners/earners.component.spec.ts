import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnersComponent } from './earners.component';

describe('EarnersComponent', () => {
  let component: EarnersComponent;
  let fixture: ComponentFixture<EarnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
