import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDocumentComponent } from './create-edit-document.component';

describe('CreateEditDocumentComponent', () => {
  let component: CreateEditDocumentComponent;
  let fixture: ComponentFixture<CreateEditDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
