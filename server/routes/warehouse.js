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
  body("name")
      .isString()
      .withMessage("please enter a valid warehouse name")
      .isLength({ min: 10 })
      .withMessage("warehouse name should be at lease 10 characters"),
  
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
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF warehouse EXISTS OR NOT
      const warehouse = await query("select * from warehouse where id = ?", [
        req.params.id,
      ]);
      if (!warehouse[0]) {
        res.status(404).json({ ms: "warehouse not found !" });
      }

      // 3- PREPARE warehouse OBJECT
      const warehouseObj = {
        name: req.body.name,
        location: req.body.location,
        status: req.body.status,
      };

      //if (req.file) {
        //warehouseObj.image_url = req.file.filename;
        //fs.unlinkSync("./upload/" + movie[0].image_url); // delete old image
      //}

      // 4- UPDATE MOVIE
      await query("update warehouse set ? where id = ?", [warehouseObj, warehouse[0].id]);

      res.status(200).json({
        msg: "warehouse updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.delete(
  "/:id", // params
  admin,
  async (req, res) => {
    try {
      // 1- CHECK IF warehouse EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const warehouse = await query("select * from warehouse where id = ?", [
        req.params.id,
      ]);
      if (!warehouse[0]) {
        res.status(404).json({ ms: "warehouse not found !" });
      }
      // 2- REMOVE MOVIE IMAGE
      //fs.unlinkSync("./upload/" + warehouse[0].image_url); // delete old image
      await query("delete from warehouse where id = ?", [warehouse[0].id]);
      res.status(200).json({
        msg: "warehouse delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


//list
router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    // QUERY PARAMS
    search = `where name LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%'`;
  }
  const warehouse = await query(`select * from warehouse ${search}`);
  /*warehouse.map((movie) => {
    warehouse.image_url = "http://" + req.hostname + ":4000/" + movie.image_url;
  });*/
  res.status(200).json(warehouse);
});
//show
router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const warehouse = await query("select * from warehouse where id = ?", [
    req.params.id,
  ]);
  if (!warehouse[0]) {
    res.status(404).json({ ms: "warehouse not found !" });
  }
  //warehouse[0].image_url = "http://" + req.hostname + ":4000/" + warehouse[0].image_url;
  /*warehouse[0].reviews = await query(
    "select * from user_warehouse_review where warehouse_id = ?",
    warehouse[0].id
  );*/
  res.status(200).json(warehouse[0]);
});

  module.exports = router;