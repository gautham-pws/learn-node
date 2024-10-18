const express = require("express");
const router = new express.Router();

const mongoose = require("mongoose");

const User = mongoose.model("User");
const Product = mongoose.model("Product");

// GET /api/analytics/users/monthly
router.get("/api/analytics/users/monthly", async (req, res) => {
  try {
    const monthlyUsers = await User.aggregate([
      {
        $group: {
          _id: {$dateToString: {format: "%Y-%m", date: "$createdAt"}},
          totalUsers: {$sum: 1},
        },
      },
      {$sort: {_id: 1}},
    ]);

    const success = {
      status: "success",
      status_code: 200,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      data: monthlyUsers,
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

// GET /api/analytics/products/monthly
router.get("/api/analytics/products/monthly", async (req, res) => {
  try {
    // Aggregating monthly products
    const monthlyProducts = await Product.aggregate([
      {
        $group: {
          _id: {$dateToString: {format: "%Y-%m", date: "$createdAt"}},
          totalProducts: {$sum: 1},
        },
      },
      {$sort: {_id: 1}},
    ]);

    const success = {
      status: "success",
      status_code: 200,
      timestamp: new Date(),
      path: req.originalUrl,
      request_id: req.requestId,
      data: monthlyProducts,
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
