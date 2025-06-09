export interface AuthData {
    email: string;
    token: string;
    expiresOn: Date;
    roles: string[];
}