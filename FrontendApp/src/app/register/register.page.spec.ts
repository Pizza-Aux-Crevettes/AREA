import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { RegisterService } from '../services/register/register.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs'; // For mocking observables

// Mock services (replace with actual implementations for integration tests)
const mockRegisterService = jasmine.createSpyObj('RegisterService', ['register', 'setNewUser']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      providers: [
        { provide: RegisterService, useValue: mockRegisterService },
        { provide: Router, useValue: mockRouter },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();  

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize with empty fields', () => {
    expect(component.inputName).toEqual('');
    expect(component.inputSurname).toEqual('');
    // ... other fields
    expect(component.emptyField).toBeFalse();
    expect(component.alreadyUse).toBeFalse();
  });

  it('should register user and navigate on success', () => {
    const mockResponse = { success: true };
    mockRegisterService.register.and.returnValue(of(mockResponse));
    mockRegisterService.setNewUser.and.returnValue(of(true)); // Simulate successful setNewUser
  
    component.inputName = 'John';
    component.inputSurname = 'Doe';
    // ... other fields with values
    component.onRegister();
  
    expect(mockRegisterService.register).toHaveBeenCalledWith(
      'John',
      'Doe',
      // ... other fields
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set emptyField flag on empty form submission', () => {
    component.onRegister();
    expect(component.emptyField).toBeTrue();
  });

  it('should set alreadyUse flag on registration error', () => {
    mockRegisterService.register.and.returnValue(throwError(new Error('Username already used')));
  
    component.inputName = 'John';
    component.inputSurname = 'Doe';
    component.inputEmail = 'johndoe@gmail.com'
    component.inputPassword = '1234'
    component.onRegister();
  
    expect(mockRegisterService.register).toHaveBeenCalledWith(
      'John',
      'Doe',
      'johndoe@gmail.com',
      '1234'
    );
    expect(component.alreadyUse).toBeTrue();
  });
});
