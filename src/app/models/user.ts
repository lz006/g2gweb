export class User {
    active: boolean;
    delivererrating: number;
    email: string;
    id: number;
    identconfirmed: boolean;
    identno: string;
    identtype: IdentTypeEnum;
    mailvalidated: boolean;
    password: string;
    role: RoleEnum;
    senderrating: number;
    displayname: string;
}

export enum RoleEnum {
    SENDER,
    DELIVERER,
    ADMIN,
    NOTACTIVATED,
}

export enum IdentTypeEnum {
    PASSPORT,
    ID,
    DRIVERLICENSE,
}
