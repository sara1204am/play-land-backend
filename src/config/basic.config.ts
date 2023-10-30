/* eslint-disable prettier/prettier */
export const environmentDefault = {
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
