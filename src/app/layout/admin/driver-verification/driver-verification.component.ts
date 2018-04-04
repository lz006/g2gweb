import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatTable, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../shared/services/user.service';
import {User} from '../../../models';
import {AlertService} from '../../../shared/services/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {UserDetailDialogComponent} from '../user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'app-driver-verification',
  templateUrl: './driver-verification.component.html',
  styleUrls: ['./driver-verification.component.scss']
})
export class DriverVerificationComponent implements OnInit {

    users: User[] = [];

    tableMetaData = {title: 'Driver Verification',
        description: 'View and process driver applications',
        displayedColumns: ['id', 'displayname', 'identtype', 'identno', 'action']
    };

    dataSource: MatTableDataSource<User[]>;


    constructor(private translate: TranslateService,
                private userService: UserService,
                private alertService: AlertService,) {
    }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.userService.getDriverApplicants().subscribe(
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