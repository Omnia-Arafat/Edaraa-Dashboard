const router = require("express").Router();
const conn = require("../DB/DbConnection");
const supervisor = require("../middleware/supervisor");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadimage");
const util = require("util"); // helper
const fs = require("fs"); // file system

//creat new product(admin)
router.post(
    "",admin,
    upload.single("image"),
    body("name")
      .isString()
      .withMessage("please enter a valid product name")
      .isLength({ min: 10 })
      .withMessage("movie name should be at lease 10 characters"),
  
    body("description")
      .isString()
      .withMessage("please enter a description "),
      //.isLength({ min: 20 }) 
      //.withMessage("description name should be at lease 20 characters"),
      body("warehouse_id")
      .isLength({ min: 1 })
      .withMessage("enter warehouose id"),
      body("stock")
      .isLength({ min: 1 })
      .withMessage("enter  a stock "),
    async (req, res) => {
      try {
        // 1- VALIDATION REQUEST [manual, express validation]
        const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

  
        // 2- VALIDATE THE IMAGE
        if (!req.file) {
          return res.status(400).json({
            errors: [
              {
                msg: "Image is Required",
              },
            ],
          });
        }
  
        // 3- PREPARE MOVIE OBJECT
        const product = {
          name: req.body.name,
          stock: req.body.stock,
          description: req.body.description,
          warehouse_id: req.body.warehouse_id,
          image_url:req.file.filename,
        };
  
        // 4 - INSERT MOVIE INTO DB
        const query = util.promisify(conn.query).bind(conn);
        await query("insert into product set ? ", product);
        res.status(200).json({
          msg: "product created successfully !",
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
      .withMessage("please enter a valid product name")
      .isLength({ min: 10 })
      .withMessage("movie name should be at lease 10 characters"),
  
    body("description")
      .isString()
      .withMessage("please enter a description "),
      //.isLength({ min: 20 }) 
      //.withMessage("description name should be at lease 20 characters"),
      body("warehouse_id")
      .isLength({ min: 1 })
      .withMessage("enter warehouose id"),
      body("stock")
      .isLength({ min: 1 })
      .withMessage("enter  a stock "),
     async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF product EXISTS OR NOT
      const product = await query("select * from product where id = ?", [
        req.params.id,
      ]);
      if (!product[0]) {
        res.status(404).json({ ms: "product not found !" });
      }

      // 3- PREPARE warehouse OBJECT
      const productObj = {
        name: req.body.name,
          stock: req.body.stock,
          description: req.body.description,
          warehouse_id: req.body.warehouse_id,
          //image_url:req.file.originalname,
      };

      if (req.file) {
        productObj.image_url = req.file.filename;
        fs.unlinkSync("./upload/" + product[0].image_url); // delete old image
      }

      // 4- UPDATE product
      await query("update product set ? where id = ?", [productObj, product[0].id]);

      res.status(200).json({
        msg: "product updated successfully",
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
      // 1- CHECK IF product EXISTS OR NOT
      const query = util.promisify(conn.query).bind(conn);
      const product = await query("select * from product where id = ?", [
        req.params.id,
      ]);
      if (!product[0]) {
        res.status(404).json({ ms: "product not found !" });
      }
     //  2- REMOVE product IMAGE
      fs.unlinkSync("./upload/" + product[0].image_url); // delete old image
      await query("delete from product where id = ?", [product[0].id]);
      res.status(200).json({
        msg: "product delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


//list
router.get("/list/:warehouse_id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const product = await query("select * from product where warehouse_id = ?", [
    req.params.warehouse_id,
  ]); 
   product.map((product) => {
    product.image_url = "http://" + req.hostname + ":4000/" + product.image_url;
  });
  res.status(200).json(product);
});
//show
router.get("/show/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const product = await query("select * from product where id = ?", [
    req.params.id,
  ]);
  if (!product[0]) {
    res.status(404).json({ ms: "product not found !" });
  }
  product[0].image_url = "http://" + req.hostname + ":4000/" + product[0].image_url;
  
  res.status(200).json(product[0]);
});

  module.exports = router;