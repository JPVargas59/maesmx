import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CPeerExplorerComponent } from './c-peer-explorer.component';

describe('CPeerExplorerComponent', () => {
  let component: CPeerExplorerComponent;
  let fixture: ComponentFixture<CPeerExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CPeerExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CPeerExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
