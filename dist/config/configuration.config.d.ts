export declare function configuration(): Promise<{
    jwt: {
        secret: string;
        expiresIn: string;
    };
    hashAlgorithm: string;
    cryptoAlgorithm: string;
    platformsList: {
        name: string;
        platformSeed: string;
        roles: string;
    }[];
    documentExrensions: string[];
    imageExtensions: string[];
}>;
