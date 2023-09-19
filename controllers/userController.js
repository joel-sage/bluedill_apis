const { creatUser, db_con } = require("../hooks/mysqlDB");
const { currentDate: date_created } = require("../hooks/useCurrentDate");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// prisma config import
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
  const {firstname, lastname, email, company, password } = req.body;
  const checkExistence = await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true
    } 
  })  
 
  if (checkExistence == null) {
    const latestQuery = await prisma.users.findMany({
      orderBy: {id: 'desc'}, select: {id: true}, take: 1,
    })
    const newId = (latestQuery.length > 0) ? latestQuery[0].id : 1;
    const newUser = await prisma.users.create({
      data: {
        userId: `Grew${(latestQuery.length > 0)? newId + 1 : 1}`,
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password, 
        company: company 
      } 
    })
    res.status(200).json({"message":"User created Please Log In " });
  } else {
    res.status(300).json({"message": "Details Parsed is already in use"})
  }


  // db_con.query(`SELECT * FROM ${`users`} WHERE ${`email`} = '${email}'`,
  //   (err, success) => {
  //     // CHECKING IF THE DETAILS IS ALREADY IN USE BEFORE CREATING;
  //     if (Object.keys(success).length < 1) {
  //       db_con.query(
  //         `INSERT INTO ${`users`} (${`id`}, ${`name`}, ${`email`}, ${`company`}, ${`password`}, ${`created_on`}, ${`plan`}) VALUES ('','${name}','${email}','${company_name}','${password}','${date_created}','${"free"}')`,
  //         (err, success) => {
  //           if (err) throw err;
  //           res.status(200).json({ message: "User Created" });
  //         }
  //       );
  //     } else {
  //       res.status(400).json({ message: "Details already In Use" });
  //     }
  //   }
  // );
};

// User Login Authentication
const loginWithAuthentication = async (req, res) => {
  const { password, email } = req.body;
  const userDetails = await prisma.users.findUnique({
    where: {
      email: email,
      password: password
    },
    select: {
      userId: true,
      email: true,
      firstname: true,
      lastname: true,
      company: true,
    } 
  })  

  if (userDetails != null) { 
    const token = jwt.sign({ ...userDetails }, process.env.NODE_JWT_SIGN_TOKEN_KEY, { expiresIn: "1 day" });
    res.cookie("token", token, { httpOnly: false })
    res.status(200).json({ tokenHash: token, "Message": "User Authenticated", ...userDetails })
  } else { 
    res.status(400).json({ message: "Invalid User Details" });
  }
  
  // db_con.query(`SELECT id, first_name, last_name, user_id, email, company FROM users WHERE email = '${email}' AND password = '${password}'`,
  //   (err, userPayload) => {
  //     if (err) throw err;
  //     if (Object.keys(userPayload).length > 0) {
  //       const token = jwt.sign({ userPayload }, process.env.NODE_JWT_SIGN_TOKEN_KEY, { expiresIn: "1 day" });
  //       res.cookie("token", token, { httpOnly: false })
  //       res.status(200).json({ tokenHash: token, "Message": "User Authenticated", payLoad: userPayload })
  //     } else {
  //       res.status(400).json({ message: "Invalid Email or Password" });
  //     }
  //   }
  // );
};

module.exports = {
  create,
  loginWithAuthentication,
};
