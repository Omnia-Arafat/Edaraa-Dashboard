const router = require("express").Router();
const conn = require("../DB/DbConnection");
// const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
//const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE MOVIE [ADMIN]

 

router.post(
  "",
    
   // upload.single("image"),
   body("users_id").isNumeric().withMessage("please enter   your id"),
  body("product_id").isNumeric().withMessage("please enter product_id"),
  body("request")
    .isString()
    .withMessage("please enter a valid request ")
    .isLength({ min: 10 })
    .withMessage("request name should be at lease 20 characters"),
   async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
        // 3- PREPARE MOVIE OBJECT
        const request = {
          users_id: req.body.users_id,
        product_id: req.body.product_id,
        request: req.body.request,
        };
  
        // 4 - INSERT MOVIE INTO DB
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into request set ? ", request);
        res.status(200).json({
          msg: "request created successfully !",
        });
        //console.log(err);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  );



router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const request = await query("select * from request ");
 
  
  res.status(200).json(request);
});

router.get("/:users_id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const request = await query("select * from request where users_id = ?", [
    req.params.users_id,
  ]); 
  
  res.status(200).json(request);
});


// MAKE REVIEW [ADMIN, USER]
// router.post(
//   "/review",
//   authorized,
//   body("movie_id").isNumeric().withMessage("please enter a valid movie ID"),
//   body("review").isString().withMessage("please enter a valid Review"),
//   async (req, res) => {
//     try {
//       const query = util.promisify(conn.query).bind(conn);
//       // 1- VALIDATION REQUEST [manual, express validation]
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // 2- CHECK IF MOVIE EXISTS OR NOT
//       const movie = await query("select * from movies where id = ?", [
//         req.body.movie_id,
//       ]);
//       if (!movie[0]) {
//         res.status(404).json({ ms: "movie not found !" });
//       }

//       // 3 - PREPARE MOVIE REVIEW OBJECT
//       const reviewObj = {
//         user_id: res.locals.user.id,
//         movie_id: movie[0].id,
//         review: req.body.review,
//       };

//       // 4- INSERT MOVIE OBJECT INTO DATABASE
//       await query("insert into user_movie_review set ?", reviewObj);

//       res.status(200).json({
//         msg: "review added successfully !",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

module.exports = router;
