const router = require("express").Router();
const conn = require("../DB/DbConnection");
const supervisor = require("../midleware/supervisor");
const admin = require("../midleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../midleware/uploadimage");
const util = require("util"); // helper
const fs = require("fs"); // file system

//creat new warehouse(admin)
router.post(
    "/create",admin,
   // upload.single("image"),
    body("name")
      .isString()
      .withMessage("please enter a valid warehouse name")
      .isLength({ min: 10 })
      .withMessage("movie name should be at lease 10 characters"),
  
    body("location")
      .isString()
      .withMessage("please enter a location "),
      //.isLength({ min: 20 }) 
      //.withMessage("description name should be at lease 20 characters"),
      body("status")
      .isLength({ min: 1 })
      .withMessage("enter warehouose is active or not ...0=>inactive/1=>active"),
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

  
        // 2- VALIDATE THE IMAGE
       /* if (!req.file) {
          return res.status(400).json({
            errors: [
              {
                msg: "Image is Required",
              },
            ],
          });
        }*/
  
        // 3- PREPARE MOVIE OBJECT
        const warehouse = {
          name: req.body.name,
          location: req.body.location,
          status: req.body.status,
        };
  
        // 4 - INSERT MOVIE INTO DB
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into warehouse set ? ", warehouse);
        res.status(200).json({
          msg: "warehouse created successfully !",
        });
        //console.log(err);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );
 

  router.put(
    "/:id", // params
    admin,
    upload.single("image"),
    body("name")
      .isString()
      .withMessage("please enter a valid movie name")
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
        const query = util.promisify(conn.query).bind(conn);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
  
        // 2- CHECK IF MOVIE EXISTS OR NOT
        const movie = await query("select * from movies where id = ?", [
          req.params.id,
        ]);
        if (!movie[0]) {
          res.status(404).json({ ms: "movie not found !" });
        }
  
        // 3- PREPARE MOVIE OBJECT
        const movieObj = {
          name: req.body.name,
          description: req.body.description,
        };
  
        if (req.file) {
          movieObj.image_url = req.file.filename;
          fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
        }
  
        // 4- UPDATE MOVIE
        await query("update movies set ? where id = ?", [movieObj, movie[0].id]);
  
        res.status(200).json({
          msg: "movie updated successfully",
        });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

    router.delete("/delete",(req,res) => {
    res.status(200).json({
      msg : "warehouse deleted",
    });
  });


//list
   router.get("",(req,res) => {
    res.status(200).json({
      warehouse : [],
    });
  });
  module.exports = router;