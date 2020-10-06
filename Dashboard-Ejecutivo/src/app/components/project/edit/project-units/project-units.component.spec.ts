import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUnitsComponent } from './project-units.component';

describe('ProjectUnitsComponent', () => {
  let component: ProjectUnitsComponent;
  let fixture: ComponentFixture<ProjectUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
