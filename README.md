# 🌱 Angular Unit and Integration Test  🌱



👀 In order to develop a good testing strategy for any project, we need to focus on right distribution of test cases [ test strategy]. 
Usually as an Engineer turned developer we tend to do things with lot of sincerity and that's what makes me post this repositoy to increase awareness on test strategy on UI side.

| Type Of test | Distribution | Description | 
| --- | --- | --- |
| Unit Tests | 80% | Unit Tests for (service + component) mock all extrnal classes |
| Component Tests | 10% | Shallow integration tests (Component/services) with critical dependencies real  |
| Integration Tests | 7% | All real dependencies  |
| End 2 End UI tests | 3% | End to End UI Tests |

👀 **Shallow Integration Tests**
I have created an integration test for an authentication component  which tests the component with real services 
[auth.component.int.spec.ts](src/app/auth/auth.component.int.spec.ts#L36) using real instances of dependent services. This type of tests are shallow integration tests. Usually it takes quite lot of time and importing of multiple modules to load the dependecies. But this in turn can be of great help for testing the scenarios and getting quick feedback.


Following snippet shows how we can inject real **CrudService** for AuthComponent

```
   await TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, BrowserModule],
            providers: [
                CrudService,
            ]
        })
            .compileComponents();
```
To run integration tests only 

```
ng test --include='src/app/modulefolder/**/*.int.spec.ts'
```

👀 **Unit Tests**
Refer to [auth.component.spec.ts](src/app/auth/auth.component.spec.ts#L45) for unit tests 

2 approaches have been mentioned for creating mock objects for CrudService.

```
  beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, BrowserModule],
            providers: [
                { provide: CrudService, useValue: crudServiceMock }, // mock service
            ]
        })
            .compileComponents();
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.4.

👀 **Development server**

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

👀 **Code scaffolding**

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

👀 **Build**

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

👀 **Running unit tests**

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

👀 **Running end-to-end tests**

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

👀 **Further Details**

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
