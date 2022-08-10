import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordlessSignInComponent } from './passwordless-sign-in.component';

describe('PasswordlessSignInComponent', () => {
  let component: PasswordlessSignInComponent;
  let fixture: ComponentFixture<PasswordlessSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordlessSignInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordlessSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
