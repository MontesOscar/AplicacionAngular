import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarUComponent } from './registrar-u.component';

describe('RegistrarUComponent', () => {
  let component: RegistrarUComponent;
  let fixture: ComponentFixture<RegistrarUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarUComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
