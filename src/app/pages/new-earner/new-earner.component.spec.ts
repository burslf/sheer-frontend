import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEarnerComponent } from './new-earner.component';

describe('NewEarnerComponent', () => {
  let component: NewEarnerComponent;
  let fixture: ComponentFixture<NewEarnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEarnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEarnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
