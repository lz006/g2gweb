import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../../shared/services/alert.service';
import { NgModule, Component, OnDestroy } from '@angular/core';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';

@Component({
    moduleId: module.id,
    selector: 'app-alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent implements OnDestroy {
    private toasterService: ToasterService;

    position = 'toast-top-right';
    animationType = 'fade';
    toasttitle = 'HI there!';
    content = `I'm cool toaster!`;
    timeout = 5000;
    toastsLimit = 5;
    type = 'default';

    isNewestOnTop = true;
    isHideOnClick = true;
    isDuplicatesPrevented = false;
    isCloseButton = true;

    config: any;

    private subscription: Subscription;

    constructor(toasterService: ToasterService, private alertService: AlertService) {
        this.toasterService = toasterService;

        this.subscription = alertService.getMessage().subscribe(alert => {
            this.showToast(alert.type, alert.title, alert.message);
        });
    }

    public showToast(type: string, title: string, body: string) {
        this.config = new ToasterConfig({
          positionClass: this.position,
          timeout: this.timeout,
          newestOnTop: this.isNewestOnTop,
          tapToDismiss: this.isHideOnClick,
          preventDuplicates: this.isDuplicatesPrevented,
          animation: this.animationType,
          limit: this.toastsLimit,
        });
        const toast: Toast = {
          type: type,
          title: title,
          body: body,
          timeout: this.timeout,
          showCloseButton: this.isCloseButton,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
      }

    clearToasts() {
        this.toasterService.clear();
    }


    ngOnDestroy(): void {
        // unsubscribe on destroy to prevent memory leaks
        // this.subscription.unsubscribe();
    }
}
