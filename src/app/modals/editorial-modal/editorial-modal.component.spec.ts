import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorialModalComponent } from './editorial-modal.component';

describe('EditorialModalComponent', () => {
  let component: EditorialModalComponent;
  let fixture: ComponentFixture<EditorialModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorialModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
