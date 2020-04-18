import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseDataFormat } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error = null;

    constructor(private authService: AuthService, public router:Router) { }

    onflipLoginMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onCancel(){
      this.error=null;
    }

    onSubmit(formData: NgForm) {
        if (!formData.valid) {
            return;
            /***
             * normally this won't be triggered as the submit button is disabled if form is invalid.
             * but somehow if the button is made to work by changing setting in developer tools,
             * we can have this extra step. well, this too can be disabled. but at last firebase will
             * take care of it.
             */
        }

        const email = formData.value.email;
        const password = formData.value.password;

        this.isLoading = true;  // inititates loading spinner.
        this.error=null;

        let authObs: Observable<AuthResponseDataFormat>

        if (!this.isLoginMode) {
            authObs = this.authService.signup(email, password)
        }
        else {
            authObs = this.authService.signin(email, password)
        }

        authObs.subscribe(
            data => {
                this.isLoading = false;
                console.log(data);
                this.router.navigate(['/recipe']);
            },
            errMsg => {
                this.error = errMsg
                this.isLoading = false;
                console.log(errMsg);
            })
        formData.reset();
    }
}
