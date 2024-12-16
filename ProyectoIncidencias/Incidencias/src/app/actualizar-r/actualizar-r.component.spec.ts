import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRComponent } from './actualizar-r.component';

describe('ActualizarRComponent', () => {
  let component: ActualizarRComponent;
  let fixture: ComponentFixture<ActualizarRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
