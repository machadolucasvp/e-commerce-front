import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentoPage } from './pagamento.page';

describe('PagamentoPage', () => {
  let component: PagamentoPage;
  let fixture: ComponentFixture<PagamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
