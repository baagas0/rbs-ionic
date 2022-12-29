import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { FormFuelIncome } from './form-income.page';

describe('FormFuelIncome', () => {
  let component: FormFuelIncome;
  let fixture: ComponentFixture<FormFuelIncome>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormFuelIncome],
      imports: [
        IonicModule.forRoot(),
        CustomComponentModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFuelIncome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
