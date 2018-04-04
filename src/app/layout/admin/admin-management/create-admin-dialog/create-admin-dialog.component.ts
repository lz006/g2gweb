import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {UserService} from '../../../../shared/services/user.service';
import {RoleEnum} from '../../../../models';
import {AlertService} from '../../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-create-admin-dialog',
  templateUrl: './create-admin-dialog.component.html',
  styleUrls: ['./create-admin-dialog.component.scss']
})
export class CreateAdminDialogComponent implements OnInit {
    model: any = {};

    ngOnInit() {}

    constructor(
        public dialogRef: MatDialogRef<CreateAdminDialogComponent>,
        private userService: UserService,
        private alertService: AlertService,
        private translate: TranslateService
    ){}

    onNoClick(): void {
        this.dialogRef.close();
    }

    checkPassword() {
        return !(this.model.password === this.model.password2);
    }

    onSave() {
        this.model.role = RoleEnum.ADMIN;
        this.userService.createUser(this.model)
            .subscribe(
                res => {
                    if (res.success === true) {
                        this.alertService.success(this.translate.instant('Successfully created user'));
                    } else {
                        this.alertService.error(this.translate.instant('Server Error'), res.message);
                    }
                });
        this.dialogRef.close();
    };

}
