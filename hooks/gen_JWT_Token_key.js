const AES = require("crypto-js/aes");
const SHA256 = require('crypto-js/sha256');
const fs = require('fs');
const JWT_TOKEN_KEY = AES.encrypt('SERIALIZED_KEY', 'TOKENKEY').toString();

fs.writeFile('./secret.txt', JWT_TOKEN_KEY, (err) => {
    if (err) {
        console.error('Error writing the file:', err);
    }  
});
