import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordiComponent } from './coordi.component';

describe('CoordiComponent', () => {
  let component: CoordiComponent;
  let fixture: ComponentFixture<CoordiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
