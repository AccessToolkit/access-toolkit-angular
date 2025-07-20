import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesComponent } from './audiences.component';

describe('AudiencesComponent', () => {
  let component: AudiencesComponent;
  let fixture: ComponentFixture<AudiencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudiencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
