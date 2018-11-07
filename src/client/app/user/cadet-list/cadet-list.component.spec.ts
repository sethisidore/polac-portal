import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadetListComponent } from './cadet-list.component';

describe('CadetListComponent', () => {
  let component: CadetListComponent;
  let fixture: ComponentFixture<CadetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
