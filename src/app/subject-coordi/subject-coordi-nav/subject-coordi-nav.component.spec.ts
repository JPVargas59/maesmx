import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCoordiNavComponent } from './subject-coordi-nav.component';

describe('SubjectCoordiNavComponent', () => {
  let component: SubjectCoordiNavComponent;
  let fixture: ComponentFixture<SubjectCoordiNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectCoordiNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectCoordiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
