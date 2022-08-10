import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePeersComponent } from './active-peers.component';

describe('ActivePeersComponent', () => {
  let component: ActivePeersComponent;
  let fixture: ComponentFixture<ActivePeersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePeersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
