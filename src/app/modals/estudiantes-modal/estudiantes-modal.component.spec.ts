import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesModalComponent } from './estudiantes-modal.component';

describe('EstudiantesModalComponent', () => {
  let component: EstudiantesModalComponent;
  let fixture: ComponentFixture<EstudiantesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudiantesModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudiantesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
