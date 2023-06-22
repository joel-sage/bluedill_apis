const { db_con } = require("../hooks/mysqlDB");
const uploadTemplate = async (req, res) => {
  if (req.file != "undefined") {
    // add the file to db_con
    db_con.query(
      `INSERT INTO ${`templates`}(${`id`}, ${`template_name`}, ${`file_name`}, ${`template_id`}, ${`date_uploaded`}) VALUES ('','${"any name"}','${
        req.file.filename
      }','SPC-ID-${Math.random()
        .toString()
        .split("")
        .filter((el) => el != ".")
        .join("")}','${Date.now()}')`,
      (err, data) => {
        if (err) throw err;
        res.status(201).json({
          message: "Template Uplaoded With No Errors",
          data: req.file,
        });
      }
    );
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
