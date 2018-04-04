import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../models';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {UserDetailDialogComponent} from '../user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
    users: User[] = [];

    tableMetaData = {
        title: 'User Management',
        description: 'View and block/unblock users',
        displayedColumns: ['id', 'displayname', 'email', 'role', 'senderrating', 'delivererrating', 'action']
    };

    constructor(private translate: TranslateService,
                private userService: UserService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.userService.getCustomers().subscribe(
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
};