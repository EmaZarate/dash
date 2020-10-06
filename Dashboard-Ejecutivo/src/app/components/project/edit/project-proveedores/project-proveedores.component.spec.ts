import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProveedoresComponent } from './project-proveedores.component';

describe('ProjectProveedoresComponent', () => {
  let component: ProjectProveedoresComponent;
  let fixture: ComponentFixture<ProjectProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
