const { creatUser, db_con } = require("../hooks/mysqlDB");
const { currentDate: date_created } = require("../hooks/useCurrentDate");
const jwt = require("jsonwebtoken");
const create = async (req, res) => {
  const { name, email, company_name, password } = req.body;

  const date = new Date();
  // Destructuring month day and year
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];

  // Destructuring hour time and second
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];


  db_con.query(
    `SELECT * FROM ${`users`} WHERE ${`email`} = '${email}'`,
    (err, success) => {
      // CHECKING IF THE DETAILS IS ALREADY IN USE BEFORE CREATING;
      if (Object.keys(success).length < 1) {
        db_con.query(
          `INSERT INTO ${`users`} (${`id`}, ${`name`}, ${`email`}, ${`company`}, ${`password`}, ${`created_on`}, ${`plan`}) VALUES ('','${name}','${email}','${company_name}','${password}','${date_created}','${"free"}')`,
          (err, success) => {
            if (err) throw err;
            res.status(200).json({ message: "User Created" });
          }
        );
      } else {
        res.status(400).json({ message: "Details already In Use" });
      }
    }
  );
};

// User Login Authentication
const authenthicate = async (req, res) => {
  const { body } = req;
  const password = body.password;
  const email = body.email;
  db_con.query(
    `SELECT * FROM ${`users`} WHERE ${`email`} = '${email}' AND ${`password`} = '${password}'`,
    (err, success) => {
      if (err) throw err;
      if (Object.keys(success).length > 0) {
        jwt.sign(
          { success },
          "sage_ssKey",
          { expiresIn: "1 day" },
          (err, tokenData) => {
            if (tokenData == "undefined") {
              res.sendStaus(403);
            } else {
              res.json({ messgae: "Authenticated", tokenData });
            }
          }
        );
      } else {
        res.status(400).json({ message: "Invalid Email or Password" });
      }
    }
  );
};

module.exports = {
  create,
  authenthicate,
};
