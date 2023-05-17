import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarlenderComponent } from './carlender.component';

describe('CarlenderComponent', () => {
  let component: CarlenderComponent;
  let fixture: ComponentFixture<CarlenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarlenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarlenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
