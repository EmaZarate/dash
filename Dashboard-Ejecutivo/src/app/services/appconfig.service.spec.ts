import { TestBed } from '@angular/core/testing';

import { AppConfig } from './appconfig.service';

describe('AppconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppConfig = TestBed.get(AppConfig);
    expect(service).toBeTruthy();
  });
});
