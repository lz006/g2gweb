import {Component, Input, Output, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../models';
import {MatDialog, MatTable, MatTableDataSource} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {UserDetailDialogComponent} from '../../user-detail-dialog/user-detail-dialog.component';

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
    users: User[] = [];
    dataSource: MatTableDataSource<User[]>;

    // Example meta data for table as fallback and for testing
    private exampleTableMetaData = {
        title: 'example title',
        description: 'example desc',
        displayedColumns: ['id']
    };

    @ViewChild('table') table: MatTable<any>;

    // Takes Array of users as Input and renders them in table
    @Input()
    set usersInput(usersInput) {
        this.users = usersInput;
        this.dataSource = new MatTableDataSource(usersInput);

        if (usersInput.length > 0) {
            this.table.renderRows();
        }
    }

    // tableMetaData should contain title nad description of table and Array of what columns to display
    @Input() tableMetaData: any = this.exampleTableMetaData;

    // Emit Event when detail dialog is closed, triggering the parents process of updating user data in table
    @Output()
    change: EventEmitter<string> = new EventEmitter<string>();

    constructor(private translate: TranslateService, public dialog: MatDialog) {};
    ngOnInit() {};

    // Filtering rules for table
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    // Open user detail dialog and emit change event after close
    openUserDetailDialog(userToDisplay): void {
        const dialogRef = this.dialog.open(UserDetailDialogComponent, {
            width: '50%',
            data: userToDisplay
        });
        dialogRef.afterClosed().subscribe(result => {
            this.change.emit();
        });

    }

}
