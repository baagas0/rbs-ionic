import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { DetailFuelUsage } from './detail-equipment.page';

describe('DetailFuelUsage', () => {
  let component: DetailFuelUsage;
  let fixture: ComponentFixture<DetailFuelUsage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DetailFuelUsage],
      imports: [
        IonicModule.forRoot(),
        CustomComponentModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailFuelUsage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
