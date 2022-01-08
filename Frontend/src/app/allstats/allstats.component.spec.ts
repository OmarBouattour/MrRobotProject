import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllstatsComponent } from './allstats.component';

describe('AllstatsComponent', () => {
  let component: AllstatsComponent;
  let fixture: ComponentFixture<AllstatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllstatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
