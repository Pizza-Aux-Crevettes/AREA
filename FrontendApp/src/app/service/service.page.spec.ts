import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicePage } from './service.page';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
import { environment } from  '../../environments/environment';
import { of } from 'rxjs';

const mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['getItem', 'setItem', 'removeItem']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockTokenService = jasmine.createSpyObj('TokenService', ['getUserData', 'setTokenInDb', 'revokeToken']);

describe('ServicePage', () => {
  let component: ServicePage;
  let fixture: ComponentFixture<ServicePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicePage],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: Router, useValue: mockRouter },
        { provide: TokenService, useValue: mockTokenService },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePage);  

    component = fixture.componentInstance;
    fixture.detectChanges();  

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set service status based on local storage', () => {
    mockLocalStorageService.getItem.and.returnValue('some_token');
    component.ngOnInit();
    expect(component.spotify_connect).toBeTrue();
    expect(component.spotify_text).toEqual('disconnection of Spotify');
    expect(component.spotify_status).toEqual('#3AB700');
  
    mockLocalStorageService.getItem.and.returnValue(null);
    component.ngOnInit();
    expect(component.spotify_connect).toBeFalse();
    expect(component.spotify_text).toEqual('Connect to Spotify');
    expect(component.spotify_status).toEqual('8cb3ff');
  });

  it('should clear query parameters from URL', () => {
    spyOn(window.history, 'replaceState');
    component.clearUrl();
    expect(window.history.replaceState).toHaveBeenCalledWith({}, document.title, window.location.href.split('?')[0]);
  });

  it('should revoke tokens and update UI on disconnect', () => {
    const service = 'google';
    const token = 'some_token';
    mockLocalStorageService.getItem.and.returnValue(token);
    mockTokenService.getUserData.and.returnValue(of({ email: 'test@email.com' }));
    component.ManageService(service, true);
  
    expect(mockTokenService.revokeToken).toHaveBeenCalledWith(service, token);
    expect(mockLocalStorageService.removeItem).toHaveBeenCalledTimes(2);
    expect(mockTokenService.setTokenInDb).toHaveBeenCalledTimes(2);
  });

});

