const { db_con } = require("../hooks/mysqlDB");
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const uploadTemplate = async (req, res) => {
  if (req.file != "undefined") {
    // add the file to db_con
    const new_file_name = Date.now()
    file.mv(`./public/template/Temp_${filename}`, (err) => {
      if (err) return res.status(500).json({ message: 'Error uploading file.', error: err });

      fs.rename(orgPath, newPath, (err) => {
        if (err) return console.error('Error renaming file:', err);

        db_con.query(`INSERT INTO ${`saved_docs`}(${`id`}, ${`doc_id`}, ${`hashed`}, ${`password`}, ${`date_created`}) VALUES ('','${doc_id}','${token}','${hash_password}','${currentDate}')`, (err, success) => {
          if (err) throw err;
          res.json({ message: `File Saved successfully!`, "success": true });
        })
      });
    });
    
    // const add_template = await prisma.template.create({
    //   data: {
    //     templateName: req.body.name,
    //     file: req.file.filname,
    //     template_id: `Temp_${Date.now()}`
    //   }
    // })
  
    // db_con.query(
    //   `INSERT INTO ${`templates`}(${`id`}, ${`template_name`}, ${`file_name`}, ${`template_id`}, ${`date_uploaded`}) 
    //      VALUES('', '${"any name"}', '${
    //     req.file.filename
    //   }','SPC-ID-${Math.random()
    //     .toString()
    //     .split("")
    //     .filter((el) => el != ".")
    //     .join("")}','${Date.now()}')`,
    //   (err, data) => {
    //     if (err) throw err;
    //     res.status(201).json({
    //       message: "Template Uplaoded With No Errors",
    //       data: req.file,
    //     });
    //   }
    // );
  } else {
    res.status(401).json({ message: "Failed to uplaod" });
  }
};

const getTemplates = async (req, res) => {
  if (req.file != "undefined") {
    // add the file to db_con
    db_con.query(`SELECT * FROM ${`templates`}`, (err, success) => {
      if (err) throw err;
      res.status(202).json({
        message: "all templates",
        templates: success,
      });
    });
  } else {
    res.status(403).json({ message: "Failed to uplaod" });
  }
};

const getTemplate = async (req, res) => {
  const templateID = req.params.id;
  db_con.query(
    `SELECT * FROM ${`templates`} WHERE ${`id`} = ${templateID}`,
    (err, template) => {
        if (err) throw err;
        if (template.length > 0) {
            res.status(202).json({
              message: "template " + templateID,
              template: template,
            });
        } else {
            res.status(404).json({"message": "Template requested cannot be found"});    
        }
    }
  );
};

module.exports = {
  uploadTemplate,
  getTemplates,
  getTemplate,
};
