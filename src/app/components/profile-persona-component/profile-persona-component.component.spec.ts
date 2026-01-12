import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonaComponentComponent } from './profile-persona-component.component';

describe('ProfilePersonaComponentComponent', () => {
  let component: ProfilePersonaComponentComponent;
  let fixture: ComponentFixture<ProfilePersonaComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePersonaComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePersonaComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
