import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../components/custom-component.module';

import { Delivery } from './delivery.page';

describe('Delivery', () => {
  let component: Delivery;
  let fixture: ComponentFixture<Delivery>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Delivery],
      imports: [IonicModule.forRoot(), CustomComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Delivery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
