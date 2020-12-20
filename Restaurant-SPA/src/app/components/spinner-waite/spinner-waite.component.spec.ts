import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerWaiteComponent } from './spinner-waite.component';

describe('SpinnerWaiteComponent', () => {
  let component: SpinnerWaiteComponent;
  let fixture: ComponentFixture<SpinnerWaiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerWaiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerWaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
