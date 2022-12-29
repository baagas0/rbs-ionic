import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../components/custom-component.module';

import { Report } from './report.page';

describe('Report', () => {
  let component: Report;
  let fixture: ComponentFixture<Report>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Report],
      imports: [IonicModule.forRoot(), CustomComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Report);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
