import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableclothsDetailComponent } from './tablecloths-detail.component';

describe('TableclothsDetailComponent', () => {
  let component: TableclothsDetailComponent;
  let fixture: ComponentFixture<TableclothsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableclothsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableclothsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
