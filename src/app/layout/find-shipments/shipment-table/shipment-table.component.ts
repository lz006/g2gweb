import { ShipmentDetailDialogComponent } from './../shipment-detail-dialog/shipment-detail-dialog.component';
import { ShipmentAnnouncement } from './../../../models/shipmentannouncement';
import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable, MatDialog } from '@angular/material';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-shipment-table',
  templateUrl: './shipment-table.component.html',
  styleUrls: ['./shipment-table.component.css']
})
export class ShipmentTableComponent {
  displayedColumns = [
      'description',
      'size',
      'price',
      'senderrating',
      'more'
  ];
  dataSource: any;
  @ViewChild('table') table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input()
  set shipmentAnnouncement(currentShipmentAnnouncements: ShipmentAnnouncement[]) {
      this.dataSource = new MatTableDataSource<ShipmentAnnouncement>(currentShipmentAnnouncements);
      if (currentShipmentAnnouncements && currentShipmentAnnouncements.length > 0) {
        this.table.renderRows();
      }
  }

  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private translate: TranslateService, public dialog: MatDialog) {

  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  // Open user detail dialog and emit change event after close
    openShipmentDetailDialog(shipmentAnnouncementToDisplay): void {
        const dialogRef = this.dialog.open(ShipmentDetailDialogComponent, {
            width: '50%',
            height: '50%',
            data: shipmentAnnouncementToDisplay
        });
        dialogRef.afterClosed().subscribe(result => {
            this.change.emit();
        });

    }
}
