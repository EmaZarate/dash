import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTabsComponent } from './edit-tabs.component';

describe('EditTabsComponent', () => {
  let component: EditTabsComponent;
  let fixture: ComponentFixture<EditTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
