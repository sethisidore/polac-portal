import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CreateFacultyComponent } from './create-faculty.component';

describe('CreateFacultyComponent', () => {
  let component: CreateFacultyComponent;
  let fixture: ComponentFixture<CreateFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ CreateFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
