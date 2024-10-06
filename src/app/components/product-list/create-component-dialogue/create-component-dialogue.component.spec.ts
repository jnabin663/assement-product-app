import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponentDialogueComponent } from './create-component-dialogue.component';

describe('CreateComponentDialogueComponent', () => {
  let component: CreateComponentDialogueComponent;
  let fixture: ComponentFixture<CreateComponentDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateComponentDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComponentDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
