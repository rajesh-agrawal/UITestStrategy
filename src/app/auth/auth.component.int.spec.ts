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
import { HttpTestingController } from '@angular/common/http/testing';


describe('Auth Component UI- Shallow Integration tests', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let crudService: CrudService;
    let routerSpy: Router;
    let httpMock: HttpTestingController;

    // generate test data
    let user = new User();
    user.username = "admin@gmail.com";
    user.password = "admin";
    user.firstName = "Rajesh";
    user.lastName = "Agrawal";
    user.token = "7298379281";

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [AuthComponent],
            imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, BrowserModule],
            providers: [

                CrudService,


            ]
        })
            .compileComponents();
        crudService = TestBed.inject(CrudService);
        routerSpy = TestBed.inject(Router);


        spyOn(crudService, 'checkCredentials').withArgs(user.username, user.password).and.returnValue(user).withArgs("a@gmail.com", "test").and.returnValue(null);


        spyOn(routerSpy, 'navigate').and.returnValue(null);
        spyOn(routerSpy, 'navigateByUrl').and.returnValue(null);
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(AuthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });
    it('Service Integration ', () => {
        // negative case
        let testUserid = "a@gmail.com";
        let testPassword = "test";
        component.form.controls['username'].setValue(testUserid);
        component.form.controls['password'].setValue(testPassword);
        component.onSubmit();
        fixture.detectChanges();
        let errors: DebugElement[] = fixture.debugElement.queryAll(By.css(".invalid-feedback"));
        expect(errors.length).toBe(0); //0 error messages shoule be shown
        expect(crudService.checkCredentials).toHaveBeenCalled();
        // expect(routerSpy.navigate).toHaveBeenCalled();
        // expect(routerSpy.navigate).toHaveBeenCalledWith(['user']);
        // spyOn(window, 'alert');
        // expect(window.alert).toHaveBeenCalledWith('invalid credentials');

        let ret = crudService.checkCredentials(testUserid, testPassword);
        expect(ret).toEqual(null);


        //positve case
        component.form.controls['username'].setValue("admin@gmail.com");
        component.form.controls['password'].setValue("admin");
        component.onSubmit();
        fixture.detectChanges();
        errors = fixture.debugElement.queryAll(By.css(".invalid-feedback"));
        expect(errors.length).toBe(0); //0 error messages shoule be shown
        expect(crudService.checkCredentials).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['user']);
        ret = crudService.checkCredentials(user.username, user.password);
        expect(ret).toEqual(user);
        fixture.detectChanges();



    });


});
