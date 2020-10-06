import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDocumentosComponent } from './project-documentos.component';

describe('ProjectDocumentosComponent', () => {
  let component: ProjectDocumentosComponent;
  let fixture: ComponentFixture<ProjectDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
