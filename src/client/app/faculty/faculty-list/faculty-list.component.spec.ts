import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FacultyListComponent } from './faculty-list.component';
import { SharedModule } from '@app/shared/shared.module';
import { FacultyService } from '../faculty.service';

describe('FacultyListComponent', () => {
  let component: FacultyListComponent;
  let fixture: ComponentFixture<FacultyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      declarations: [ FacultyListComponent ],
      providers: [FacultyService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
