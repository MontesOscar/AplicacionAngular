import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarRComponent } from './registrar-r.component';

describe('RegistrarRComponent', () => {
  let component: RegistrarRComponent;
  let fixture: ComponentFixture<RegistrarRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarRComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
