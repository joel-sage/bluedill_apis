const { creatUser, db_con } = require("../hooks/mysqlDB");
const { currentDate: date_created } = require("../hooks/useCurrentDate");
const jwt = require("jsonwebtoken");
require('dotenv').config();

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

  db_con.query(`SELECT * FROM ${`users`} WHERE ${`email`} = '${email}'`,
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
const loginWithAuthentication = async (req, res) => {
  const { password , email } = req.body;
  db_con.query(`SELECT id, first_name, last_name, user_id, email, company FROM users WHERE email = '${email}' AND password = '${password}'`,
    (err, userPayload) => {
      if (err) throw err;
      if (Object.keys(userPayload).length > 0) {
        const token = jwt.sign({ userPayload }, process.env.NODE_JWT_SIGN_TOKEN_KEY, { expiresIn: "1 day" });
        res.cookie("token", token, {httpOnly:false})
        res.status(200).json({ tokenHash: token, "Message": "User Authenticated", payLoad: userPayload})
      } else {
        res.status(400).json({ message: "Invalid Email or Password" });
      }
    }
  );
}; 

module.exports = {
  create,
 loginWithAuthentication,
};
