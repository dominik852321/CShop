import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableclothsListComponent } from './tablecloths-list.component';

describe('TableclothsListComponent', () => {
  let component: TableclothsListComponent;
  let fixture: ComponentFixture<TableclothsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableclothsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableclothsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
