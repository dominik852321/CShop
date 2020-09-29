import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableclothsCardComponent } from './tablecloths-card.component';

describe('TableclothsCardComponent', () => {
  let component: TableclothsCardComponent;
  let fixture: ComponentFixture<TableclothsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableclothsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableclothsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
