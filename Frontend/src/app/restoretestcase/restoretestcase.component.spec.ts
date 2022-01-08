import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoretestcaseComponent } from './restoretestcase.component';

describe('RestoretestcaseComponent', () => {
  let component: RestoretestcaseComponent;
  let fixture: ComponentFixture<RestoretestcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoretestcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoretestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
