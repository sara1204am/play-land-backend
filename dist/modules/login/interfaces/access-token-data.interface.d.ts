export declare class AccessToken {
    id: string;
    expiresToken: Date;
    expiresRefreshToken: Date;
    isRevoked: boolean;
    userId: string | null;
    token: string;
    created: Date | null;
    user?: any | null;
}
