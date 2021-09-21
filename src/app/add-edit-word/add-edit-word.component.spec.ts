import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWordComponent } from './add-edit-word.component';

describe('EditAddWordComponent', () => {
  let component: AddEditWordComponent;
  let fixture: ComponentFixture<AddEditWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
