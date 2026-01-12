import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageV2Component } from './main-page-v2.component';

import Keyboard from "simple-keyboard";

describe('MainPageV2Component', () => {
  let component: MainPageV2Component;
  let fixture: ComponentFixture<MainPageV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPageV2Component]
    });
    fixture = TestBed.createComponent(MainPageV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
