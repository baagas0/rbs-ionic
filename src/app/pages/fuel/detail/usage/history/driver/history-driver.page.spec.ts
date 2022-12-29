import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../../../../../components/custom-component.module';

import { HistoryEquipment } from './history-driver.page';

describe('HistoryEquipment', () => {
  let component: HistoryEquipment;
  let fixture: ComponentFixture<HistoryEquipment>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryEquipment],
      imports: [IonicModule.forRoot(), CustomComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
