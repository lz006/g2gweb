import { UserService } from './../shared/services/user.service';
import { User } from './../models/user';
import { AlertService } from './../shared/services/alert.service';
import { AuthenticationService } from './../shared/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {

    model: any = {};
    loading = false;

    identTypes = [
        {value: '1', viewValue: this.translate.instant('Passport')},
        {value: '2', viewValue: this.translate.instant('ID')},
        {value: '3', viewValue: this.translate.instant('Driver License')}
      ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translate: TranslateService,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        this.translate.addLangs(['en', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|de/) ? browserLang : 'en');

    }


    checkPassword() {
        return !(this.model.password === this.model.password2);
    }

    register() {
        this.loading = true;
        this.userService.signup(this.model)
            .subscribe(
                data => {
                    this.alertService.success(this.translate.instant('Registration successful'));
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error.status, error.message);
                    this.loading = false;
                });
    }
}
