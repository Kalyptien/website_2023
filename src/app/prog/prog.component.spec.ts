import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgComponent } from './prog.component';

describe('ProgComponent', () => {
  let component: ProgComponent;
  let fixture: ComponentFixture<ProgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgComponent]
    });
    fixture = TestBed.createComponent(ProgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
