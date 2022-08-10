import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerNavComponent } from './peer-nav.component';

describe('NavComponent', () => {
  let component: PeerNavComponent;
  let fixture: ComponentFixture<PeerNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
