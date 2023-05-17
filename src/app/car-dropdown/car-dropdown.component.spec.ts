import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDropdownComponent } from './car-dropdown.component';

describe('CarDropdownComponent', () => {
  let component: CarDropdownComponent;
  let fixture: ComponentFixture<CarDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
