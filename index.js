const express = require("express");
require("./db/connection");

const userRouter = require("./routers/user.routers");

const app = express();
app.use(userRouter);

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.listen("3000");

// app.get("/", async (req, res) => {
//   try {
//     res.status(200).send();
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });
