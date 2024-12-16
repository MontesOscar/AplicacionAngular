import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmasInfoComponent } from './rmas-info.component';

describe('RmasInfoComponent', () => {
  let component: RmasInfoComponent;
  let fixture: ComponentFixture<RmasInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RmasInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RmasInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
