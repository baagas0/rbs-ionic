import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../../components/custom-component.module';

import { Detail } from './detail.page';

describe('Detail', () => {
  let component: Detail;
  let fixture: ComponentFixture<Detail>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Detail],
      imports: [IonicModule.forRoot(), CustomComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Detail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
