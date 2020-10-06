import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatesComponent } from './project-states.component';

describe('ProjectStatesComponent', () => {
  let component: ProjectStatesComponent;
  let fixture: ComponentFixture<ProjectStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
