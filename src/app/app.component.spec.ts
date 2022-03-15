import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CrudService } from './crud.service';

describe('AppComponent', () => {
  let service: CrudService;
  beforeEach(() => {
   
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule

      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: HttpClientTestingModule },
      ]
    }).compileComponents();

    let httpclient:HttpClient;
    httpclient=TestBed.inject(HttpClient);
    console.log(httpclient);

    service = new CrudService(httpclient);
    console.log(service.getDate());
  });
  
  it('should create the app', () => {
    console.log(service.getDate());
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-service-example'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-service-example');
  });

});
