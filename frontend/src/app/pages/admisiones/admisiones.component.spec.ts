import { ComponentFixture, TestBed } from '@angular/core/testing';
// Se importa el nombre correcto de la clase
import { AdmisionesComponent } from './admisiones.component'; 

describe('AdmisionesComponent', () => {
  let component: AdmisionesComponent;
  let fixture: ComponentFixture<AdmisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Se utiliza el componente correcto en los imports
      imports: [AdmisionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdmisionesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});