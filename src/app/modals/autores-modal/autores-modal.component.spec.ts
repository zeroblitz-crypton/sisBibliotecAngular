import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoresModalComponent } from './autores-modal.component';

describe('AutoresModalComponent', () => {
  let component: AutoresModalComponent;
  let fixture: ComponentFixture<AutoresModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoresModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
