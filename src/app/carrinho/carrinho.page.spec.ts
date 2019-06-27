import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoPage } from './carrinho.page';

describe('CarrinhoPage', () => {
  let component: CarrinhoPage;
  let fixture: ComponentFixture<CarrinhoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrinhoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrinhoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
