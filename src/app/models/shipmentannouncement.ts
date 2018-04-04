import { ShipmentRequest } from './shipmentrequest';
import { Address } from './address';
import { User } from './user';
import { ShipmentSize } from './shipmentsize';
export class ShipmentAnnouncement {
    id: number;
    sender: User;
    description: string;
    source: Address;
    aproxsourcecoordinates: string;
    destination: Address;
    aproxdestinationcoordinates: string;
    size: ShipmentSize;
    earliestpickupdate: Date;
    latestpickupdate: Date;
    latestdeliverydate: Date;
    price: number;
    shipmentrequests: ShipmentRequest[];
}
