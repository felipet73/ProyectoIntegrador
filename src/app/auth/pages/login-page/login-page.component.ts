import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DialogComponent, AnimationSettingsModel, DialogModule } from '@syncfusion/ej2-angular-popups';
import { ButtonComponent, ButtonModule } from '@syncfusion/ej2-angular-buttons';

import { inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
/**
 * Draggable Dialog Component
 */
@Component({
    selector: 'app-login-page',
    styleUrls: ['login-page.component.css'],
    templateUrl: 'login-page.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, DialogModule, ReactiveFormsModule, TextBoxModule  ]
})

export class LoginPageComponent {

    @ViewChild('defaultDialog')
    public defaultDialog!: DialogComponent;

    @ViewChild('dialogBtn')
    public dialogBtn!: ButtonComponent;

    public dialogHeader: string = 'LogIn  ';
    public dialogCloseIcon: Boolean = true;
    public dialogWidth: string = '400px';
    public contentData: string = '';
    public dialogdragging: Boolean = true;
    public animationSettings: AnimationSettingsModel = { effect: 'Zoom' };
    public isModal: Boolean = true;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = false;
    public visible: Boolean = true;


    public dialogBtnClick = (): void => {
        this.defaultDialog.show();
        this.dialogOpen();
    }

    public dialogClose = (): void => {
        //this.dialogBtn.element.style.display = 'block';
        this.router.navigateByUrl('/');
    }

    public dialogOpen = (): void => {
        this.dialogBtn.element.style.display = 'none';
    }

     //Focus Event function for input component
    public focusIn(target: any): void {
        if (target.parentElement) {
            target.parentElement.classList.add('e-input-focus');
        }
    }

    //FocusOut Event function for input component
    public focusOut(target: any): void {
        if (target.parentElement) {
            target.parentElement.classList.remove('e-input-focus');
        }
    }

    constructor() { }

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }

}




/*import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }

    const { email = '', password = '' } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
  }

  // Check Authentication

  // Registro

  // Logout
}*/
