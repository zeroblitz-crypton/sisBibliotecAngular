import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroModalComponent } from './libro-modal.component';

describe('LibroModalComponent', () => {
  let component: LibroModalComponent;
  let fixture: ComponentFixture<LibroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibroModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
