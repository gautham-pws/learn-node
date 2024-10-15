const express = require("express");
const User = require("../db/models/user");
// const auth = require("./middleware/auth");
const router = new express.Router();

// POST api/users add new users
router.post("/users", async (req, res) => {
  //   const user = new User(req.body);
  try {
    // await user.save();
    // const token = await user.generateAuthToken();
    res.status(201).send();
    // res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// PUT api/users/:id update users by id

// GET api/users get all users
router.get("/users", async (req, res) => {
  //   const user = new User(req.body);
  try {
    // await user.save();
    // const token = await user.generateAuthToken();
    res.status(201).send();
    // res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e.message);
  }
});
// GET api/users/:id get user details by id

// DELETE api/users delete user by id

module.exports = router;
