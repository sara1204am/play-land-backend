"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentDefault = void 0;
exports.environmentDefault = {
    hashAlgorithm: 'sha256' || 'sha1',
    cryptoAlgorithm: 'sha1' || 'sha1',
    platformsList: [
        {
            name: 'spcc-frontend',
            platformSeed: '9qxs2n3k',
            roles: '*',
        }
    ],
    documentExrensions: ['pdf', 'doc', 'docx', 'txt'],
    imageExtensions: ['png', 'jpg', 'jpeg'],
};
//# sourceMappingURL=basic.config.js.map