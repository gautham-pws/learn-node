const express = require("express");
const User = require("../db/models/user");
// const auth = require("./middleware/auth");
const router = new express.Router();

// POST api/users add new users
router.post("/api/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    const success = {
      status: "success",
      status_code: 201,
      timestamp: new Date(),
      path: "/api/users",
      request_id: req.requestId,
      data: user,
    };
    // res.status(201).send(success);
    res.status(201).send({success, token});
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
      //   documentation_url: "",
      //   error: {
      //     response: e,
      //     code: "RESOURCE_NOT_FOUND",
      //     message: "The requested resource was not found",
      //     details: "The user with the ID '12345' does not exist in our records.",
      //     suggestion: "Please check if user already exists",
      //   },
    };
    res.status(400).send(error);
  }
});

// PUT api/users/:id update users by id
router.patch("/api/users/:id", async (req, res) => {
  //   const user = new User(req.body);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    // const token = await user.generateAuthToken();
    const success = {
      status: "success",
      status_code: 201,
      timestamp: new Date(),
      path: "/api/users",
      request_id: req.requestId,
      data: user,
    };
    res.status(201).send(success);
    // res.status(201).send({success, token});
  } catch (e) {
    const error = {
      status: "error",
      status_code: 400,
      timestamp: new Date(),
      path: "/api/users",
      request_id: req.requestId,
      method: "PUT",
      error: {
        message: e.message,
      },
      //   documentation_url: "",
      //   error: {
      //     response: e,
      //     code: "RESOURCE_NOT_FOUND",
      //     message: "The requested resource was not found",
      //     details: "The user with the ID '12345' does not exist in our records.",
      //     suggestion: "Please check if user already exists",
      //   },
    };
    res.status(400).send(error);
  }
});

// GET api/users get all users
router.get("/api/users", async (req, res) => {
  try {
    const user = await User.find();
    // if (user === null) {
    //   //   res.status(404).send({});
    //   throw new Error(`User '${req.params.email}' not found`);
    // }
    res.status(200).send(user);
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

// GET api/users/:id get user details by id
router.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    if (user === null) {
      //   res.status(404).send({});
      throw new Error(`User '${req.params.id}' not found`);
    }
    res.status(200).send(user);
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

// GET api/users/:email get user details by id
router.get("/api/users/:email", async (req, res) => {
  try {
    const user = await User.findOne({email: req.params.email});
    if (user === null) {
      //   res.status(404).send({});
      throw new Error(`User '${req.params.email}' not found`);
    }
    res.status(200).send(user);
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

// DELETE api/users delete user by id
router.delete("/api/users/:id", async (req, res) => {
  console.log("delete request");
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error(`User '${req.params.id}' not found`);
    }
    res.status(200).send(user);
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

module.exports = router;
