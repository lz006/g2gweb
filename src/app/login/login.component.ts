import { User } from './../models/user';
import { AlertService } from './../shared/services/alert.service';
import { AuthenticationService } from './../shared/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private translate: TranslateService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
        this.translate.addLangs(['en', 'de']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|de/) ? browserLang : 'en');

    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;

        const user: User = new User();
        user.email = this.model.email;
        user.password = this.model.password;

        this.authenticationService.login(user)
            .subscribe(
                data => {
                    if (data && data.user && data.user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(data));
                        this.router.navigate(['/dashboard']);
                    } else {
                        this.alertService.error(this.translate.instant('Error'), data.message);
                        this.loading = false;
                    }
                    // this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error.status, error.message);
                    this.loading = false;
                });
    }

}
