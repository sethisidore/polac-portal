import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetDetailComponent } from './cadet-detail.component';

describe('CadetDetailComponent', () => {
  let component: CadetDetailComponent;
  let fixture: ComponentFixture<CadetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
