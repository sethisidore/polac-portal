import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FacultyDetailComponent } from './faculty-detail.component';
import { FacultyService } from '../faculty.service';

describe('FacultyDetailComponent', () => {
  let component: FacultyDetailComponent;
  let fixture: ComponentFixture<FacultyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ FacultyDetailComponent ],
      providers: [FacultyService]
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
