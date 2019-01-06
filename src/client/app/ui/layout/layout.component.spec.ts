import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SharedModule } from '@app/shared/shared.module';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ LayoutComponent, HeaderComponent, FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  /*
  it(`should have component 'app-header'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toContain(HeaderComponent, 'Should contain - HeaderComponent');
  });

  it(`should have component 'app-footer'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toContain(FooterComponent, 'Should contain - FooterComponent');
  });
  */
});
