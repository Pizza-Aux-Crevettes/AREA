import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginPage } from './login.page';
import { LoginService } from '../services/login/login.service';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { TokenService } from 'src/app/services/token/token.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  // Mock services
  const mockLoginService = jasmine.createSpyObj('LoginService', ['login']);
  const mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['setItem']);
  const mockTokenService = jasmine.createSpyObj('TokenService', ['getUserData', 'getServicesTokens', 'revokeToken']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        { provide: LoginService, useValue: mockLoginService },
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: TokenService, useValue: mockTokenService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially have empty email and password fields', () => {
    expect(component.inputEmail).toBe('');
    expect(component.inputPassword).toBe('');
  });

  // it('should handle successful login and navigate to dashboard', () => {
  //   const mockResponse = { own_token: 'valid_token' };
  //   const mockUserData = { email: 'test@example.com' };
  //   const mockServicesTokens = {
  //     spotify_token: 'spotify_token_value',
  //     google_token: 'google_token_value',
  //     x_token: 'x_token_value',
  //     discord_token: 'discord_token_value',
  //     spotify_refresh: 'spotify_refresh_value',
  //     google_refresh: 'google_refresh_value',
  //     x_refresh: 'x_refresh_value',
  //     discord_refresh: 'discord_refresh_value',
  //   };

  //   mockLoginService.login.and.returnValue(of(mockResponse));
  //   mockTokenService.getUserData.and.returnValue(of(mockUserData));
  //   mockTokenService.getServicesTokens.and.returnValue(of(mockServicesTokens));

  //   component.inputEmail = 'valid@email.com';
  //   component.inputPassword = 'validPassword';
  //   component.onLogin();

  //   expect(mockLoginService.login).toHaveBeenCalledWith('valid@email.com', 'validPassword');
  //   expect(mockLocalStorageService.setItem).toHaveBeenCalledWith('token', 'valid_token');
  //   expect(mockTokenService.getUserData).toHaveBeenCalledWith('valid_token');
  //   expect(mockTokenService.getServicesTokens).toHaveBeenCalledWith('test@example.com');

  //   // Verify each service token is stored
  //   component.services.forEach((service) => {
  //     expect(mockLocalStorageService.setItem).toHaveBeenCalledWith(service, mockServicesTokens[service]);
  //   });

  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  // });

  it('should handle invalid login and show error message', () => {
    const errorResponse = new Error('Invalid credentials');
    mockLoginService.login.and.returnValue(throwError(() => errorResponse));

    component.inputEmail = 'invalid@email.com';
    component.inputPassword = 'wrongPassword';
    component.onLogin();

    expect(mockLoginService.login).toHaveBeenCalledWith('invalid@email.com', 'wrongPassword');
    expect(component.invalidField).toBeTrue();
  });

  it('should handle error when retrieving user data', () => {
    const mockResponse = { own_token: 'valid_token' };
    const error = new Error('Error fetching user data');

    mockLoginService.login.and.returnValue(of(mockResponse));
    mockTokenService.getUserData.and.returnValue(throwError(() => error));

    component.inputEmail = 'valid@email.com';
    component.inputPassword = 'validPassword';
    component.onLogin();

    expect(mockLoginService.login).toHaveBeenCalledWith('valid@email.com', 'validPassword');
    expect(mockTokenService.getUserData).toHaveBeenCalledWith('valid_token');
    expect(component.invalidField).toBeTrue();
  });

  it('should handle error when retrieving service tokens', () => {
    const mockResponse = { own_token: 'valid_token' };
    const mockUserData = { email: 'test@example.com' };
    const error = new Error('Error fetching service tokens');

    mockLoginService.login.and.returnValue(of(mockResponse));
    mockTokenService.getUserData.and.returnValue(of(mockUserData));
    mockTokenService.getServicesTokens.and.returnValue(throwError(() => error));

    component.inputEmail = 'valid@email.com';
    component.inputPassword = 'validPassword';
    component.onLogin();

    expect(mockLoginService.login).toHaveBeenCalledWith('valid@email.com', 'validPassword');
    expect(mockTokenService.getUserData).toHaveBeenCalledWith('valid_token');
    expect(mockTokenService.getServicesTokens).toHaveBeenCalledWith('test@example.com');
    expect(component.invalidField).toBeTrue();
  });
});
