import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectObjetivosComponent } from './project-objetivos.component';

describe('ProjectObjetivosComponent', () => {
  let component: ProjectObjetivosComponent;
  let fixture: ComponentFixture<ProjectObjetivosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectObjetivosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectObjetivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
