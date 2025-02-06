import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnhancedKeyboardComponent } from './enhanced-keyboard.component';

describe('EnhancedKeyboardComponent', () => {
  let component: EnhancedKeyboardComponent;
  let fixture: ComponentFixture<EnhancedKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnhancedKeyboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnhancedKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
