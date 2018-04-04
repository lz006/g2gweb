import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../models';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {UserDetailDialogComponent} from '../user-detail-dialog/user-detail-dialog.component';
import {CreateAdminDialogComponent} from './create-admin-dialog/create-admin-dialog.component';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {
    users: User[] = [];

    tableMetaData = {title: 'Manage Admins',
        description: 'View admins and create new ones',
        displayedColumns: ['id', 'email', 'action']
    };

    constructor(private translate: TranslateService,
                private userService: UserService,
                private alertService: AlertService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.userService.getAdmins().subscribe(
            res => {
                if (res.success === true) {
                    this.users = res.result;
                } else {
                    this.alertService.error(this.translate.instant('Server Error'), res.message);
                }
            });
    }

    handleUsersChanged() {
        this.loadUsers();
    }


    openCreateUserDialog(): void {
        const dialogRef = this.dialog.open(CreateAdminDialogComponent, {
            width: '50%'
        });

        dialogRef.afterClosed().subscribe(result => {
            this.handleUsersChanged();
        });

    }
}
