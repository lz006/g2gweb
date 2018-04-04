import { User } from './user';
export class Address {
    id: number;
    companyname: string;
    lastname: string;
    firstname: string;
    streetno: string;
    street: string;
    postcode: number;
    city: string;
    country: string;
    homeaddress: boolean;
    user: User;
}
