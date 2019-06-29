import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfpedidoPage } from './confpedido.page';

describe('ConfpedidoPage', () => {
  let component: ConfpedidoPage;
  let fixture: ComponentFixture<ConfpedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfpedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfpedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
