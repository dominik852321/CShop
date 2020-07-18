import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtainCardComponent } from './curtain-card.component';

describe('CurtainCardComponent', () => {
  let component: CurtainCardComponent;
  let fixture: ComponentFixture<CurtainCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurtainCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurtainCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
