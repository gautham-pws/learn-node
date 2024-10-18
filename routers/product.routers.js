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
    // const product = await Product.find();

    // const product = await Product.find().populate("createdBy");
    const product = await Product.find()
      .populate("createdBy")
      .populate("userId");

    const success = {
      status: "success",
      status_code: 200,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      data: product,
    };

    res.status(200).send(success);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// GET api/products/:id get products by id
router.get("/api/products/id/:id", async (req, res) => {
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
      path: req.originalUrl,
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
      path: req.originalUrl,
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

// GET api/products/published - Get products based on published status
router.get("/api/products/published", async (req, res) => {
  const isPublished = req.query.published === "false" ? false : true;

  try {
    const products = await Product.find({published: isPublished});
    res.status(200).send(products);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// GET api/products?name= find all products by name
router.get("/api/products/name", async (req, res) => {
  try {
    const products = await Product.find({name: req.query.name});
    console.log("🚀 ~ router.get ~ req.query:", req.query);
    res.status(200).send(products);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// GET api/products/:userId get all products by user id
router.get("/api/products/userId/:userId", async (req, res) => {
  try {
    const products = await Product.find({userId: req.params.userId});
    res.status(200).send(products);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// POST api/products/:userId to add new products by userId
router.post("/api/products/userId/:userId", async (req, res) => {
  const {userId} = req.params;
  const productData = {...req.body, userId: userId};

  const product = new Product(productData);
  try {
    await product.save();
    const success = {
      status: "success",
      status_code: 201,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      data: product,
    };
    res.status(201).send(success);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

// PATCH api/products/userId/:userId/:productId to update a product by userId
router.patch("/api/products/userId/:userId/:productId", async (req, res) => {
  const {userId, productId} = req.params;
  try {
    const product = await Product.findOneAndUpdate(
      {_id: productId, createdBy: userId},
      req.body,
      {new: true, runValidators: true}
    );

    if (!product) {
      return res.status(404).send({
        status: "error",
        status_code: 404,
        timestamp: new Date(),
        path: req.originalUrl,
        request_id: req.requestId,
        error: {
          message:
            "Product not found or you don't have permission to update it.",
        },
      });
    }

    const success = {
      status: "success",
      status_code: 200,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      data: product,
    };
    res.status(200).send(success);
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      error: {
        message: e.message,
      },
    };
    res.status(400).send(error);
  }
});

module.exports = router;
