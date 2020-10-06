import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProviderComponent } from './create-edit-provider.component';

describe('CreateEditProviderComponent', () => {
  let component: CreateEditProviderComponent;
  let fixture: ComponentFixture<CreateEditProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEditProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
