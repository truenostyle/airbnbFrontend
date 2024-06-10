import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarthostPageComponent } from './starthost-page.component';

describe('StarthostPageComponent', () => {
  let component: StarthostPageComponent;
  let fixture: ComponentFixture<StarthostPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarthostPageComponent]
    });
    fixture = TestBed.createComponent(StarthostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
