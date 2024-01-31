import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoModalComponent } from './permiso-modal.component';

describe('PermisoModalComponent', () => {
  let component: PermisoModalComponent;
  let fixture: ComponentFixture<PermisoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermisoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
