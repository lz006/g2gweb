import { FindShipmentsComponent } from './find-shipments/find-shipments.component';
import { OpenShipmentsComponent } from './open-shipments/open-shipments.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { IconsComponent } from './icons/icons.component';
import { TypographyComponent } from './typography/typography.component';
import { TableListComponent } from './table-list/table-list.component';
import { AuthGuard } from './../shared/guard/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import {LandingComponent} from './landing/landing.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '',               redirectTo: 'landing'},
            { path: 'dashboard',      component: DashboardComponent },
            { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard]},
            { path: 'table-list',     component: TableListComponent },
            { path: 'typography',     component: TypographyComponent },
            { path: 'icons',          component: IconsComponent },
            { path: 'notifications',  component: NotificationsComponent },
            { path: 'upgrade',        component: UpgradeComponent },
            { path: 'open-shipments', component: OpenShipmentsComponent },
            { path: 'find-shipments', component: FindShipmentsComponent },
            { path: 'landing', component: LandingComponent },
            { path: 'admin', component: AdminComponent },



        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
