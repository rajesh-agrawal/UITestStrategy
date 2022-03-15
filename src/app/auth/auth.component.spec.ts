import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CrudService } from '../crud.service';
import { By } from '@angular/platform-browser';
import { AuthComponent } from './auth.component';
import { Router } from '@angular/router';
import { User } from '../common/user.model';
import { promise } from 'selenium-webdriver';
import { of } from 'rxjs';
import { Mock } from 'protractor/built/driverProviders';


describe('Auth Component UI- Unit tests', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let crudService: CrudService;
    let routerSpy: Router;

    // generate test data
    let user = new User();
    user.username = "admin@gmail.com";
    user.password = "admin";
    user.firstName = "Rajesh";
    user.lastName = "Agrawal";
    user.token = "7298379281";
    // approach 1 generate mock service  
    let crudServiceMock = Object.create({
        checkCredentials: function (username, password) {
            if (username == "admin@gmail.com" && password == "admin") {
                return of(user);
            }
            return null;
        },
        getDate: {}
    });

    // approach 2 to create mock service object
    // crudServiceMock = jasmine.createSpyObj('CrudService', ['checkCredentials']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, BrowserModule],
            providers: [
                { provide: CrudService, useValue: crudServiceMock }, // mock service
            ]
        })
            .compileComponents();
        
        routerSpy = TestBed.inject(Router);
        // Creating mock for function calls
        spyOn(crudServiceMock, 'checkCredentials').withArgs(user.username, user.password).and.returnValue(user);
        spyOn(routerSpy, 'navigate').and.returnValue(null);
        spyOn(routerSpy, 'navigateByUrl').and.returnValue(null);
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('component sanity checks & Visibility', () => {
        expect(component).toBeTruthy();
        let loginForm: DebugElement = fixture.debugElement.query(By.css("#loginForm"));
        console.log("loginForm.nativeElement.style.hidden " + loginForm.nativeElement.style.hidden);
        expect(loginForm.nativeElement.style.hidden).toBeUndefined();

    });
    it('Form Required Validation Checks', () => {
        component.form.controls['username'].setValue("");
        component.form.controls['password'].setValue("");
        component.onSubmit();
        fixture.detectChanges();
        let errors: DebugElement[] = fixture.debugElement.queryAll(By.css(".invalid-feedback"));
        let success = 0;
        for (let i = 0; i < errors.length; i++) {
            console.log('errors[i].nativeElement.innerHTML ' + errors[i].nativeElement.textContent);
            if (errors[i].nativeElement.textContent.indexOf("Username is required") != -1) {
                success++;
            }
            if (errors[i].nativeElement.textContent.indexOf("Password is required") != -1) {
                success++;
            }
        }
        expect(success).toEqual(2); // 2 error messages shoule be shown

    });

    it('Form Email Validation Checks', () => {
        component.form.controls['username'].setValue("admin");
        component.form.controls['password'].setValue("admin");
        component.onSubmit();
        fixture.detectChanges();
        let errors: DebugElement[] = fixture.debugElement.queryAll(By.css(".invalid-feedback"));
        let success = 0;
        for (let i = 0; i < errors.length; i++) {
            console.log('errors[i].nativeElement.innerHTML ' + errors[i].nativeElement.textContent);
            if (errors[i].nativeElement.textContent.indexOf("Username needs to be email") != -1) {
                success++;
            }
        }
        expect(success).toEqual(1); // 2 error messages shoule be shown

    });


    it('Form Functional', () => {
        component.form.controls['username'].setValue("admin@gmail.com");
        component.form.controls['password'].setValue("admin");
        component.onSubmit();
        fixture.detectChanges();
        let errors: DebugElement[] = fixture.debugElement.queryAll(By.css(".invalid-feedback"));
        expect(errors.length).toBe(0); //0 error messages shoule be shown
        expect(crudServiceMock.checkCredentials).toHaveBeenCalledWith('admin@gmail.com','admin');
        expect(routerSpy.navigate).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['user']);

        let ret = crudServiceMock.checkCredentials(user.username, user.password);
        expect(ret).toEqual(user);

    });


});
