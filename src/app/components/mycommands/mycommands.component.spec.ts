import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycommandsComponent } from './mycommands.component';

describe('MycommandsComponent', () => {
  let component: MycommandsComponent;
  let fixture: ComponentFixture<MycommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycommandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
