import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVComponent } from './cv.component';

describe('CVComponent', () => {
  let component: CVComponent;
  let fixture: ComponentFixture<CVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CVComponent]
    });
    fixture = TestBed.createComponent(CVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
