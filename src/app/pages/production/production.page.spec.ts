import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CustomComponentModule } from '../../components/custom-component.module';

import { Production } from './production.page';

describe('Production', () => {
  let component: Production;
  let fixture: ComponentFixture<Production>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Production],
      imports: [IonicModule.forRoot(), CustomComponentModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Production);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
