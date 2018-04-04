import { ShipmentRequestService } from './../shared/services/shipmentrequest.service';
import { ShipmentDetailDialogComponent } from './find-shipments/shipment-detail-dialog/shipment-detail-dialog.component';
import { ShipmentTableComponent } from './find-shipments/shipment-table/shipment-table.component';
import { AlertModule } from './../utils/alert/alert.module';
import { ToasterModule } from 'angular2-toaster';
import { AlertComponent } from './../utils/alert/alert.component';
import { GeocodeService } from './../shared/services/geocode.service';
import { FindShipmentsComponent } from './find-shipments/find-shipments.component';
import { AlertService } from './../shared/services/alert.service';
import { ShipmentSizeService } from './../shared/services/shipmentsize.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShipmentFormComponent } from './open-shipments/shipment-form/shipment-form.component';
import { ShipmentAnnouncementService } from './../shared/services/shipmentannouncement.service';
import { OpenShipmentsComponent } from './open-shipments/open-shipments.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { TableListComponent } from './table-list/table-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatListModule, MatTableModule, MatCheckboxModule, MatIconModule, MatPaginatorModule, MatDividerModule
} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { AgmCoreModule } from '@agm/core';
import {LandingComponent} from './landing/landing.component';

import { AdminComponent } from './admin/admin.component';
import { DriverVerificationComponent } from './admin/driver-verification/driver-verification.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { AdminManagementComponent } from './admin/admin-management/admin-management.component';
import { CreateAdminDialogComponent } from './admin/admin-management/create-admin-dialog/create-admin-dialog.component';
import { UserDetailDialogComponent } from './admin/user-detail-dialog/user-detail-dialog.component';
import { ShipmentManagementComponent } from './admin/shipment-management/shipment-management.component';
import { UserTableComponent } from './admin/components/user-table/user-table.component';

@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        NotificationsComponent,
        UpgradeComponent,
        LayoutComponent,
        OpenShipmentsComponent,
        ShipmentFormComponent,
        FindShipmentsComponent,
        LandingComponent,
        AdminComponent,
        DriverVerificationComponent,
        UserManagementComponent,
        AdminManagementComponent,
        CreateAdminDialogComponent,
        UserDetailDialogComponent,
        ShipmentDetailDialogComponent,
        ShipmentManagementComponent,
        UserTableComponent,
        ShipmentTableComponent
      ],
    imports: [
        AlertModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        LayoutRoutingModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBRDi-DHe6hBJxPKHoqkMYZFP8X7o71458'
          }),
        MatSliderModule
    ],
    providers: [
        DatePipe,
        AlertService,
        ShipmentSizeService,
        ShipmentAnnouncementService,
        ShipmentRequestService,
        GeocodeService
    ],
    entryComponents: [
        UserDetailDialogComponent,
        CreateAdminDialogComponent,
        ShipmentDetailDialogComponent
    ]

})
export class LayoutModule {}
