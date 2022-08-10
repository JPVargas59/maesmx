import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRequestModalComponent } from './help-request-modal.component';

describe('HelpRequestModalComponent', () => {
  let component: HelpRequestModalComponent;
  let fixture: ComponentFixture<HelpRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
