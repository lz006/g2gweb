import { ShipmentSize } from './shipmentsize';
import { User } from './user';
import { Address } from './address';
export class ShipmentSubscription {
    id: number;
    source: Address;
    sourcecoordinates: string;
    destination: Address;
    destinationcoordinates: string;
    deliverer: User;
    maxsize: ShipmentSize;
    pickupfrom: Date;
    deliveruntil: Date;
    radius: number;
    destinationradius: number;
}