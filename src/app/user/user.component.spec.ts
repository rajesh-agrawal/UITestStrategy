import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { User } from '../common/user.model';

import { UserComponent } from './user.component';
@Pipe({ name: 'uppercase' })
export class MockPipe implements PipeTransform {
  transform(value: string): string {
    //Do stuff here, if you want
    if (value != undefined)
      return "MOCK" + value;
    else
      return "";
  }
}
describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let testUser = new User();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent,]
    })
      .compileComponents();
  });

  beforeEach(() => {

    testUser.username = "admin@gmail.com";
    testUser.password = "admin";
    testUser.firstName = "Rajesh";
    testUser.lastName = "Agrawal";
    testUser.token = "7298379281";
    localStorage.removeItem("user");
    // localStorage.setItem("user", JSON.stringify(testUser));

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    console.log("fixture.debugElement.query('#userLabel').nativeElement.textContent " + fixture.debugElement.query(By.css("#userLabel")).nativeElement.textContent);
    expect(fixture.debugElement.query(By.css("#userLabel")).nativeElement.textContent).toBe("");

    localStorage.setItem("user", JSON.stringify(testUser));
    component.ngOnInit();
    fixture.detectChanges();
    // expect(fixture.debugElement.query(By.css("#userLabel")).nativeElement.textContent).toBe("MOCK" + testUser.firstName + " " + testUser.lastName);

    console.log("fixture.debugElement.query('#userLabel').nativeElement.textContent " + fixture.debugElement.query(By.css("#userLabel")).nativeElement.textContent);

  });
});
