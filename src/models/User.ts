export class User {
    id: number;
    typeCode: string;
    code: number | string;
    secondaryCode?: number | string;
    name: string;
    email: string;
    birthday?: Date;
}