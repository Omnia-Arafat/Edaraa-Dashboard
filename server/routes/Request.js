const router = require("express").Router();
const conn = require("../DB/DbConnection");
// const authorized = require("../middleware/authorize");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadImages");
const util = require("util"); // helper
const fs = require("fs"); // file system

// CREATE MOVIE [ADMIN]
router.post(
  "",
  supervisor,

  body("name")
    .isString()
    .withMessage("please enter a valid Request name")
    .isLength({ min: 10 })
    .withMessage("movie name should be at lease 10 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

     

      // 3- PREPARE MOVIE OBJECT
      const movie = {
        name: req.body.name,
        description: req.body.description,
        image_url: req.file.filename,
      };

      // 4 - INSERT MOVIE INTO DB
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into movies set ? ", movie);
      res.status(200).json({
        msg: "movie created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// UPDATE MOVIE [ADMIN]
// router.put(
//   "/:id", // params
//   admin,
//   upload.single("image"),
//   body("name")
//     .isString()
//     .withMessage("please enter a valid movie name")
//     .isLength({ min: 10 })
//     .withMessage("movie name should be at lease 10 characters"),

//   body("description")
//     .isString()
//     .withMessage("please enter a valid description ")
//     .isLength({ min: 20 })
//     .withMessage("description name should be at lease 20 characters"),
//   async (req, res) => {
//     try {
//       // 1- VALIDATION REQUEST [manual, express validation]
//       const query = util.promisify(conn.query).bind(conn);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // 2- CHECK IF MOVIE EXISTS OR NOT
//       const movie = await query("select * from movies where id = ?", [
//         req.params.id,
//       ]);
//       if (!movie[0]) {
//         res.status(404).json({ ms: "movie not found !" });
//       }

//       // 3- PREPARE MOVIE OBJECT
//       const movieObj = {
//         name: req.body.name,
//         description: req.body.description,
//       };

//       if (req.file) {
//         movieObj.image_url = req.file.filename;
//         fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
//       }

//       // 4- UPDATE MOVIE
//       await query("update movies set ? where id = ?", [movieObj, movie[0].id]);

//       res.status(200).json({
//         msg: "movie updated successfully",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

// // DELETE MOVIE [ADMIN]
// router.delete(
//   "/:id", // params
//   admin,
//   async (req, res) => {
//     try {
//       // 1- CHECK IF MOVIE EXISTS OR NOT
//       const query = util.promisify(conn.query).bind(conn);
//       const movie = await query("select * from movies where id = ?", [
//         req.params.id,
//       ]);
//       if (!movie[0]) {
//         res.status(404).json({ ms: "movie not found !" });
//       }
//       // 2- REMOVE MOVIE IMAGE
//       fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
//       await query("delete from movies where id = ?", [movie[0].id]);
//       res.status(200).json({
//         msg: "movie delete successfully",
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// );

// LIST & SEARCH [ADMIN, USER]
// router.get("", async (req, res) => {
//   const query = util.promisify(conn.query).bind(conn);
//   let search = "";
//   if (req.query.search) {
//     // QUERY PARAMS
//     search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
//   }
//   const movies = await query(`select * from movies ${search}`);
//   movies.map((movie) => {
//     movie.image_url = "http://" + req.hostname + ":4000/" + movie.image_url;
//   });
//   res.status(200).json(movies);
// });

// // SHOW MOVIE [ADMIN, USER]
// router.get("/:id", async (req, res) => {
//   const query = util.promisify(conn.query).bind(conn);
//   const movie = await query("select * from movies where id = ?", [
//     req.params.id,
//   ]);
//   if (!movie[0]) {
//     res.status(404).json({ ms: "movie not found !" });
//   }
//   movie[0].image_url = "http://" + req.hostname + ":4000/" + movie[0].image_url;
//   movie[0].reviews = await query(
//     "select * from user_movie_review where movie_id = ?",
//     movie[0].id
//   );
//   res.status(200).json(movie[0]);
// });

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
