import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRolComponent } from './create-edit-rol.component';

describe('CreateEditRolComponent', () => {
  let component: CreateEditRolComponent;
  let fixture: ComponentFixture<CreateEditRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
