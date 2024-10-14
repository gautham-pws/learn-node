const express = require("express");
// require("./utils/db");
const Task = require("../db/models/tasks");
const auth = require("./middleware/auth");

// const util = require("node:util");
const router = new express.Router();
// router.use(express.json());
// router.listen(3000);

//router.post('/users', async (req, res) => {
//	console.log(req.body)
//})

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({...req.body, owner: req.user._id});
  try {
    await task.save();
    // const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (e) {
    res.status(400).send(e.message);
    //		console.log(e)
  }
});

// router.get("/tasks", auth, async (req, res) => {
//   try {
//     //		const users = await Task.find({})
//     //		if (!users) {
//     //			res.status(404).send()
//     //		}
//     res.status(200).send(req.user);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

router.get("/tasks/", async (req, res) => {
  try {
    const task = await Task.find();
    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.patch("/tasks/:id", async (req, res) => {
  try {
    //		const user = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
    const task = await Task.findById(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await Task.findByIdAndDelete(req.params.id, req.body, {
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

// router.post("/login", async (req, res) => {
//   try {
//     const user = await Task.findByCredentials(
//       req.body.email,
//       req.body.password
//     );
//     const token = await user.generateAuthToken();
//     res.status(200).send({user, token});
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

// router.post("/logout", auth, async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter(
//       (token) => token.token !== req.token
//     );
//     await req.user.save();
//     res.status(200).send(req.user);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

module.exports = router;
