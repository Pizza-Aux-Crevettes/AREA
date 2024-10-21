import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DashboardPage } from './dashboard.page';
import { LocalStorageService } from '../services/localStorage/localStorage.service';
import { Router } from '@angular/router';
import { AreaService } from '../services/area/area.service';
import { of } from 'rxjs';

const mockLocalStorageService = jasmine.createSpyObj('LocalStorageService', ['getItem', 'removeItem']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
const mockAreaService = jasmine.createSpyObj('AreaService', ['getArea', 'delArea', 'setArea']);

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardPage],
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService },
        { provide: Router, useValue: mockRouter },
        { provide: AreaService, useValue: mockAreaService },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should clear cookies and navigate on deleteCookies', () => {
    mockLocalStorageService.getItem.and.returnValue('some_token');
    component.deleteCookies();
    expect(mockLocalStorageService.removeItem).toHaveBeenCalledTimes(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should add a new area', () => {
    const initialLength = component.areas.length;
    component.addNewArea();
    expect(component.areas.length).toBe(initialLength + 1);
  });

  it('should call AreaService.setArea on ApplyArea', () => {
    const action = 'some_action';
    const reaction = 'some_reaction';
    const inputAction = 'input_action';
    const inputReaction = 'input_reaction';
    mockLocalStorageService.getItem.and.returnValue('valid_token');
    component.ApplyArea(action, reaction, inputAction, inputReaction);
    expect(mockAreaService.setArea).toHaveBeenCalledWith(
      'valid_token',
      action,
      reaction,
      inputAction,
      inputReaction
    );
  });
});