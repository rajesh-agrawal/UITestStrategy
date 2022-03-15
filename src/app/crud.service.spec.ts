import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';

describe('CrudService', () => {
  let service: CrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientTestingModule]
    }).compileComponents();
    let service: CrudService;
    service = new CrudService(TestBed.get(HttpClient));
    console.log("service ==> " + service);

  });

  it('should be created', () => {
    let service: CrudService;
    service = new CrudService(TestBed.get(HttpClient));
    console.log("service ==> " + service);
     console.log("service ==> " + service);
    let dat = service.getDate();
    console.log("date " + dat);
    expect(dat).toEqual('10-Jan-2021');
    expect(service).toBeTruthy();
  });
});
