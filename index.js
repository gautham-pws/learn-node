const express = require("express");
require("./db/connection");

const userRouter = require("./routers/user.routers");
const productRouter = require("./routers/product.routers");
const requestId = require("./middleware/requestId");

const app = express();

app.use(express.json());

app.use(requestId);
app.use(userRouter);
app.use(productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
