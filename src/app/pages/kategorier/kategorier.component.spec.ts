import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorierComponent } from './kategorier.component';

describe('KategorierComponent', () => {
  let component: KategorierComponent;
  let fixture: ComponentFixture<KategorierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KategorierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KategorierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
