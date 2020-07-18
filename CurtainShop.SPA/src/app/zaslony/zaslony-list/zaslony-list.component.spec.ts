import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaslonyListComponent } from './zaslony-list.component';

describe('ZaslonyListComponent', () => {
  let component: ZaslonyListComponent;
  let fixture: ComponentFixture<ZaslonyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaslonyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaslonyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
