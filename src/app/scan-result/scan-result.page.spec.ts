import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanResultModal } from './scan-result.page';

describe('AlergensModal', () => {
  let component: ScanResultModal;
  let fixture: ComponentFixture<ScanResultModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScanResultModal],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanResultModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
