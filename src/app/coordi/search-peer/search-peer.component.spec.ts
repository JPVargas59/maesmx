import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPeerComponent } from './search-peer.component';

describe('SearchPeerComponent', () => {
  let component: SearchPeerComponent;
  let fixture: ComponentFixture<SearchPeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPeerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
