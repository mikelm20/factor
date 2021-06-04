import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVideoComponent } from './show-video.component';
import { HttpService } from '../../../globals/helpers/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from "@angular/router";
import { convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MockHTTP } from '../../../../tests/mockHTTPService';

describe('ShowVideoComponent', () => {
  let component: ShowVideoComponent;
  let fixture: ComponentFixture<ShowVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVideoComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ 
        {provide: HttpService, useClass: MockHTTP},
        {provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(sessionStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(sessionStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(sessionStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(sessionStorage, 'clear').and.callFake(mockLocalStorage.clear);
    sessionStorage.setItem('token', 'REDACTED.JWT.TOKEN');
    
    fixture = TestBed.createComponent(ShowVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
