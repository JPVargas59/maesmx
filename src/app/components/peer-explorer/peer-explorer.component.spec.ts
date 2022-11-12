import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeerExplorerComponent } from './peer-explorer.component';

describe('PeerExplorerComponent', () => {
  let component: PeerExplorerComponent;
  let fixture: ComponentFixture<PeerExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeerExplorerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeerExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
