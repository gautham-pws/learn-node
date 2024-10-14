const express = require("express");
// require("./utils/db");
const User = require("../db/models/users");
const auth = require("./middleware/auth");

// const util = require("node:util");
const router = new express.Router();
// router.use(express.json());
// router.listen(3000);

//router.post('/users', async (req, res) => {
//	console.log(req.body)
//})

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    //		await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e.message);
    //		console.log(e)
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    //		const users = await User.find({})
    //		if (!users) {
    //			res.status(404).send()
    //		}
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/users/:email", async (req, res) => {
  try {
    const user = await User.find({email: req.params.email});
    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    //		const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({user, token});
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
