import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WritetestComponent } from './writetest.component';

describe('WritetestComponent', () => {
  let component: WritetestComponent;
  let fixture: ComponentFixture<WritetestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WritetestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WritetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
