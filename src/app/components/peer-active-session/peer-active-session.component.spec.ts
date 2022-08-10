import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerActiveSessionComponent } from './peer-active-session.component';

describe('PeerActiveSessionComponent', () => {
  let component: PeerActiveSessionComponent;
  let fixture: ComponentFixture<PeerActiveSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerActiveSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerActiveSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
