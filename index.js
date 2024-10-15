const express = require("express");
require("./db/connection");

const userRouter = require("./routers/user.routers");
const requestId = require("./middleware/requestId");

const app = express();

app.use(express.json());

app.use(requestId);
app.use(userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
