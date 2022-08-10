import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestFormComponent } from './help-request-form.component';

describe('HelpRequestFormComponent', () => {
  let component: HelpRequestFormComponent;
  let fixture: ComponentFixture<HelpRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
