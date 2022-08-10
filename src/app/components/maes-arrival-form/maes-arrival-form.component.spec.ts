import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaesArrivalFormComponent } from './maes-arrival-form.component';

describe('MaesArrivalFormComponent', () => {
  let component: MaesArrivalFormComponent;
  let fixture: ComponentFixture<MaesArrivalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaesArrivalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaesArrivalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
