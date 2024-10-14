const express = require("express");
// require("./db/connection");
require("./db/connection");
const userRouter = require("./routers/user.routers");
const taskRouter = require("./routers/task.routers");
// const taskRouter = require("./middleware/auth");

// const util = require("node:util");
const app = express();
app.use(express.json());
app.user(userRouter);
app.user(taskRouter);
app.listen(3000);
