import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRequestModalComponent } from './register-request-modal.component';

describe('HelpRequestModalComponent', () => {
  let component: RegisterRequestModalComponent;
  let fixture: ComponentFixture<RegisterRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
