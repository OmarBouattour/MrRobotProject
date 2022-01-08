import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtestcaseComponent } from './addtestcase.component';

describe('AddtestcaseComponent', () => {
  let component: AddtestcaseComponent;
  let fixture: ComponentFixture<AddtestcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtestcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
