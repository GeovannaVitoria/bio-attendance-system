import { TestBed } from '@angular/core/testing';

import { RegistroPonto } from '../registro-ponto/registro-ponto';

describe('RegistroPonto', () => {
  let service: RegistroPonto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPonto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
