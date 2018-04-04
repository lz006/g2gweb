import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../models';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})
export class UserDetailDialogComponent implements OnInit {
    readOnly = true;
    isNewUser = this.user.id === null;

    constructor(
        public dialogRef: MatDialogRef<UserDetailDialogComponent>,
        private userService: UserService,
        private alertService: AlertService,
        private translate: TranslateService,
        @Inject(MAT_DIALOG_DATA) public user: User) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    onVerify() {
        this.userService.verifyDeliverer(this.user)
            .subscribe(
                res => {
                    if (res.success === true) {
                        this.alertService.success(this.translate.instant('User upgraded to deliverer'));
                    } else {
                        this.alertService.error(this.translate.instant('Server Error'), res.message);
                    }
                });
        this.dialogRef.close();
    };
    onDeny() {
        this.alertService.success(this.translate.instant('User upgrade to deliverer denied'));
        this.dialogRef.close();
        // TODO: What happens after deny? Email?

    };

    onBlock() {
        this.userService.blockUser(this.user)
            .subscribe(
                res => {
                    if (res.success === true) {
                        this.alertService.success(this.translate.instant('User blocked'));
                    } else {
                        this.alertService.error(this.translate.instant('Server Error'), res.message);
                    }
                });
        this.dialogRef.close();
    }
    onUnblock() {
        this.userService.unblockUser(this.user)
            .subscribe(
                res => {
                    if (res.success === true) {
                        this.alertService.success(this.translate.instant('User unblocked'));
                    } else {
                        this.alertService.error(this.translate.instant('Server Error'), res.message);
                    }
                });
        this.dialogRef.close();
    }

    onSave(){
        this.isNewUser ? console.log('new') : console.log ('old');
    }

    onToggleEdit() {
        this.readOnly = !this.readOnly;
    }

    ngOnInit() {
    }

}
