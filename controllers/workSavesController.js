const { scryptSync, createDecipheriv, createCipheriv } = require('crypto');
const fs = require('fs');

const encrypt = (filePath, output, algorithm, key, iv) => {
    const fileStream = fs.ReadStream(filePath);
    const outputFileStream = fs.createWriteStream(output);

    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted;
    fileStream.on('data', (data) => {
        encrypted = cipher.update(data);
        outputFileStream.write(encrypted);
    })

    fileStream.on('end', () => {
        outputFileStream.end();
    })
}

const password = "0000";
// const algorithm = 'aes-192-cbc';
const algorithm = 'aes-192-cbc';
let key = scryptSync(password, 'salt', 24);
let iv = Buffer.alloc(16, 0) 

const decrypt = (inputFilePath, outputFilePath, algorithm, key, iv) => {
    const outputWriteStream = fs.createWriteStream(outputFilePath);
    const inputReadStream = fs.ReadStream(inputFilePath);

    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted
    inputReadStream.on('data', (data) => {
        decrypted = decipher.update(data);
        outputWriteStream.write(decrypted);
    });
    inputReadStream.on('end', () => {
        outputWriteStream.end();
    });
}

const saveWithCrypt = async (req, res) => {
    const { file } = req.files
    let encryptPath = '';
    file.mv(`./public/encrypted/${file.name}`, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file.', error: err });
        }

        encrypt(`./public/encrypted/${file.name}`, `./public/encrypted/${file.name}.enc`, algorithm, key, iv);
        setTimeout(() => {
            fs.unlink(`./public/encrypted/${file.name}`, (err) => {
                if (err) throw err;
                console.log('File successfully deleted');
            });
        }, 2000)
        res.json({ message: 'File uploaded successfully!' });
    });
}

const retriveCrypt = async () => {
    decrypt(`./public/encrypted/AM.docx.enc`, `./public/encrypted/AM.docx`, algorithm, key, iv);
}

module.exports = {
    saveWithCrypt,
    retriveCrypt
}