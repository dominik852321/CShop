import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtainListComponent } from './curtain-list.component';

describe('CurtainListComponent', () => {
  let component: CurtainListComponent;
  let fixture: ComponentFixture<CurtainListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurtainListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurtainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
