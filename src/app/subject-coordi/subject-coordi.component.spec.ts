import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCoordiComponent } from './subject-coordi.component';

describe('SubjectCoordiComponent', () => {
  let component: SubjectCoordiComponent;
  let fixture: ComponentFixture<SubjectCoordiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectCoordiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectCoordiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
