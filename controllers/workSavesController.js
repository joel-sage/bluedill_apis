const fs = require('fs');
const jwt = require('jsonwebtoken');
const { db_con } = require('../hooks/mysqlDB');
const { currentDate } = require('../hooks/useCurrentDate');
const saveWithCrypt = async (req, res) => {
    const { file } = req.files;
    const filename = file.name;
    const { hash_password, doc_id } = req.body;
    const token = jwt.sign({ filename }, hash_password);
    const orgPath = `./public/encrypted/${filename}`;
    const newPath = `./public/encrypted/${token}.hash`;

    db_con.query(`SELECT * FROM saved_docs WHERE doc_id = '${doc_id}'`, (err, success) => {
        if (err) return console.log(err);
        if (success.length < 1) {
            if (hash_password.trim().length >= 8) {
                file.mv(`./public/encrypted/${filename}`, (err) => {
                    if (err) return res.status(500).json({ message: 'Error uploading file.', error: err });

                    fs.rename(orgPath, newPath, (err) => {
                        if (err) return console.error('Error renaming file:', err);

                        db_con.query(`INSERT INTO ${`saved_docs`}(${`id`}, ${`doc_id`}, ${`hashed`}, ${`password`}, ${`date_created`}) VALUES ('','${doc_id}','${token}','${hash_password}','${currentDate}')`, (err, success) => {
                            if (err) throw err;
                            res.json({ message: `File Saved successfully!`, "success": true });
                        })
                    });
                });
            } else {
                res.status(300).json({
                    "warning": "Password length must be at least 8"
                })
            }
        } else {
            file.mv(`./public/encrypted/${filename}`, (err) => {
                if (err) return res.status(500).json({ message: 'Error uploading file.', error: err });

                fs.rename(orgPath, newPath, (err) => {
                    if (err) return console.error('Error renaming file:', err);

                    db_con.query(`UPDATE ${`saved_docs`} SET hashed = '${token}', password = '${hash_password}' WHERE doc_id = '${doc_id}'`, (err, success) => {
                        if (err) throw err;
                        res.json({ message: `File Saved successfully!`, "success": true });
                    })
                });
            });
        }
    })
}

const retriveCrypt = async (req, res) => {
    const { doc_id, password } = req.body

    db_con.query(`SELECT * FROM saved_docs WHERE doc_id = '${doc_id}' AND password = '${password}' `, (err, document) => {
        if (err) return err;
        if (document.length > 0) {
            const { hashed, password } = document[0];
            const { filename } = jwt.verify(hashed, password);
            const orgPath = `./public/encrypted/${hashed}.hash`;
            const newPath = `./public/encrypted/${filename}`;
            fs.rename(orgPath, newPath, (err) => {
                if (err) return console.error('Error renaming file:', err);
                res.status(200).json({
                    "Message": "Document retrived from saved",
                })
            });

        } else {
            res.status(404).json({
                "ERROR": "Document Could not be found",
            })
        }
    })
    // const verified = jwt.verify(fetched, hash_password);
}

module.exports = {
    saveWithCrypt,
    retriveCrypt,
}