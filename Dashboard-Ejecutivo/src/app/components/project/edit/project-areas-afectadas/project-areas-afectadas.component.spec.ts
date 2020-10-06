import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAreasAfectadasComponent } from './project-areas-afectadas.component';

describe('ProjectAreasAfectadasComponent', () => {
  let component: ProjectAreasAfectadasComponent;
  let fixture: ComponentFixture<ProjectAreasAfectadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAreasAfectadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAreasAfectadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
