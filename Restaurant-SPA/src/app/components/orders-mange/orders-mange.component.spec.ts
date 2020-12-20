import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersMangeComponent } from './orders-mange.component';

describe('OrdersMangeComponent', () => {
  let component: OrdersMangeComponent;
  let fixture: ComponentFixture<OrdersMangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersMangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersMangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
