const express = require('express')
const router = express.Router()
const conn = require("../DB/DbConnection");
const supervisor = require("../middleware/supervisor");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadimage");
const util = require("util"); // helper
const fs = require("fs"); // file system

//creat new supervisor(admin)
router.post(
    "",admin,
    body("email").isEmail().withMessage("please enter a valid email!"),
    body("name")
      .isString()
      .withMessage("please enter a valid name")
      .isLength({ min: 10, max: 20 })
      .withMessage("name should be between (10-20) character"),
    body("password")
      .isLength({ min: 8, max: 12 })
      .withMessage("password should be between (8-12) character"),
      body("phone").isLength({ min: 10, max: 12 }),
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
  
        // 2- CHECK IF EMAIL EXISTS
        const query = util.promisify(conn.query).bind(conn); // transform query mysql --> promise to use [await/async]
        const checkEmailExists = await query(
          "select * from users where email = ?",
          [req.body.email]
        );
        if (checkEmailExists.length > 0) {
          res.status(400).json({
            errors: [
              {
                msg: "email already exists !",
              },
            ],
          });
        }
  
  
        // 3- PREPARE OBJECT USER TO -> SAVE
        const userData = {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: await bcrypt.hash(req.body.password, 10),
          token: crypto.randomBytes(16).toString("hex"), // JSON WEB TOKEN, CRYPTO -> RANDOM ENCRYPTION STANDARD
        };
  
        // 4- INSERT USER OBJECT INTO DB
        await query("insert into users set ? ", userData);
        delete userData.password;
        res.status(200).json(userData);
      
          //res.json("succses");
  
  
        
      } catch (err) {
       //console.log(err);
        res.status(500).json({ err: err });
      }
    }
  );
 

 router.put(
  "/:id",admin, // params
  
  body("email").isEmail().withMessage("please enter a valid email!"),
  body("name")
    .isString()
    .withMessage("please enter a valid name")
    .isLength({ min: 10, max: 20 })
    .withMessage("name should be between (10-20) character"),
  body("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("password should be between (8-12) character"),
    body("phone").isLength({ min: 10, max: 12 }),
     async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF warehouse EXISTS OR NOT
      const users = await query("select * from users where id = ?", [
        req.params.id,
      ]);
      if (!users[0]) {
        res.status(404).json({ ms: "supervisor not found !" });
      }

      // 3- PREPARE warehouse OBJECT
      const usersObj = {
        name: req.body.name,
        location: req.body.location,
        status: req.body.status,
      };

     
      // 4- UPDATE MOVIE
      await query("update users set ? where id = ?", [usersObj, users[0].id]);

      res.status(200).json({
        msg: "supervisor updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete(
  "/:id", admin,// params
  
  async (req, res) => {
    try {
      // 1- CHECK IF supervisor EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const users = await query("select * from supervisor where id = ?", [
        req.params.id,
      ]);
      if (!users[0]) {
        res.status(404).json({ ms: "supervisor not found !" });
      }
      
      await query("delete from supervisor where id = ?", [users[0].id]);
      res.status(200).json({
        msg: "supervisor delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


//list
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const users = await query("select * from users where role = 0");
 
  
  res.status(200).json(users);
});
//show
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const users = await query("select * from users where id = ?", [
    req.params.id,
  ]);
  if (!users[0]) {
    res.status(404).json({ ms: "supervisor not found !" });
  }
 
  res.status(200).json(users[0]);
});

  module.exports = router;