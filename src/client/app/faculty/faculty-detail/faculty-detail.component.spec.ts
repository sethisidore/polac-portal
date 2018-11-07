import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyDetailComponent } from './faculty-detail.component';

describe('FacultyDetailComponent', () => {
  let component: FacultyDetailComponent;
  let fixture: ComponentFixture<FacultyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
