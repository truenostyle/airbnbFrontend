import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForguestsComponent } from './forguests.component';

describe('ForguestsComponent', () => {
  let component: ForguestsComponent;
  let fixture: ComponentFixture<ForguestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForguestsComponent]
    });
    fixture = TestBed.createComponent(ForguestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
