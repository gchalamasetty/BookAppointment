import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeSelectionCompComponent } from './date-time-selection-comp.component';

describe('DateTimeSelectionCompComponent', () => {
  let component: DateTimeSelectionCompComponent;
  let fixture: ComponentFixture<DateTimeSelectionCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeSelectionCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeSelectionCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
