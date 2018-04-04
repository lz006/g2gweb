import { ShipmentAnnouncement } from './shipmentannouncement';
import { User } from './user';
export class ShipmentRequest {
    id: number;
    shipmentannouncement: ShipmentAnnouncement;
    deliverydatetime: Date;
    deliverer: User;
    pickupdatetime: Date;
}
