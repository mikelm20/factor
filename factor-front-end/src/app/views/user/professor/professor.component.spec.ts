import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorComponent } from './professor.component';
import { HttpService } from '../../../globals/helpers/http.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MockHTTP } from '../../../../tests/mockHTTPService';

describe('ProfessorComponent', () => {
  let component: ProfessorComponent;
  let fixture: ComponentFixture<ProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule, FormsModule ],
      providers: [ {provide: HttpService, useClass: MockHTTP} ]
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
    
    fixture = TestBed.createComponent(ProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
