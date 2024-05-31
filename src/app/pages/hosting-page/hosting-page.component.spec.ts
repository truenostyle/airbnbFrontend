import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostingPageComponent } from './hosting-page.component';

describe('HostingPageComponent', () => {
  let component: HostingPageComponent;
  let fixture: ComponentFixture<HostingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostingPageComponent]
    });
    fixture = TestBed.createComponent(HostingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
