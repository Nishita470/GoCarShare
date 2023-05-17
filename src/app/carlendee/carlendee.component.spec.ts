import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarlendeeComponent } from './carlendee.component';

describe('CarlendeeComponent', () => {
  let component: CarlendeeComponent;
  let fixture: ComponentFixture<CarlendeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarlendeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarlendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
