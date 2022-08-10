import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordiNavComponent } from './coordi-nav.component';

describe('CoordiNavComponent', () => {
  let component: CoordiNavComponent;
  let fixture: ComponentFixture<CoordiNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordiNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
