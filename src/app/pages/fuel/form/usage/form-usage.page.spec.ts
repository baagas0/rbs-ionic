import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { FormFuelUsage } from './form-usage.page';

describe('FormFuelUsage', () => {
  let component: FormFuelUsage;
  let fixture: ComponentFixture<FormFuelUsage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormFuelUsage],
      imports: [
        IonicModule.forRoot(),
        CustomComponentModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFuelUsage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
