const express = require("express");
const Product = require("../db/models/product");
const router = new express.Router();
const auth = require("../middleware/auth");

// GET api/products get all products
router.get("/api/products", async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   throw new Error(
    //     "Access denied. You don't have permission to view products"
    //   );
    // }

    const product = await Product.find();

    res.status(200).send(product);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// GET api/products/:id get products by id
router.get("/api/products/:id", async (req, res) => {
  try {
    // if (req.user.role !== "admin") {
    //   throw new Error(
    //     "Access denied. You don't have permission to view products"
    //   );
    // }

    const product = await Product.findOne({_id: req.params.id});

    res.status(200).send(product);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// POST api/products add new products
router.post("/api/products", async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    const success = {
      status: "success",
      status_code: 201,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      data: product,
    };
    res.status(201).send(success);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// PUT api/products/:id update products by id
router.patch("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const success = {
      status: "success",
      status_code: 201,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      data: product,
    };
    res.status(201).send(success);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// DELETE api/products/:id remove products by id
router.delete("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new Error(`Product '${req.params.id}' not found`);
    }
    res.status(200).send(product);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: "/api/users",
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// DELETE api/products remove all products
router.delete("/api/products", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    throw new Error(
      "Access denied. You don't have permission to delete products."
    );
  }
  try {
    const result = await Product.deleteMany({});
    res.status(200).send({
      status: "success",
      status_code: 200,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      message: `${result.deletedCount} products have been successfully deleted.`,
    });
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: "/api/products",
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// GET api/products/published find all published products

// GET api/products?name= find all products by name

// GET api/products/:userId get all products by user id

// DELETE api/products/:id remove products by id

// POST api/products/:userid add new products by userid

// PUT api/products/:userid and product id update products by userid

module.exports = router;
