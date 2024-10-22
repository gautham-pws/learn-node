// const express = require("express");
// require("./db/connection");
// require("./middleware/scheduler");

// const userRouter = require("./routers/user.routers");
// const productRouter = require("./routers/product.routers");
// const analyticsRouter = require("./routers/analytics.routers");
// const requestId = require("./middleware/requestId");

// const app = express();

// app.use(express.json());

// app.use(requestId);
// app.use(userRouter);
// app.use(productRouter);
// app.use(analyticsRouter);

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

// app.use("/*", async (req, res) => {
//   const error = {
//     status: "error",
//     status_code: 400,
//     timestamp: new Date(),
//     path: req.originalUrl,
//     request_id: req.requestId,
//     error: {
//       message: "Invalid path",
//     },
//   };
//   res.status(400).send(error);
// });

// module.exports = app;

const express = require("express");
require("./db/connection");
require("./middleware/scheduler");

const userRouter = require("./routers/user.routers");
const productRouter = require("./routers/product.routers");
const analyticsRouter = require("./routers/analytics.routers");
const requestId = require("./middleware/requestId");

const app = express();

app.use(express.json());
app.use(requestId);
app.use(userRouter);
app.use(productRouter);
app.use(analyticsRouter);

app.use("/*", async (req, res) => {
  const error = {
    status: "error",
    status_code: 400,
    timestamp: new Date(),
    path: req.originalUrl,
    request_id: req.requestId,
    error: {
      message: "Invalid path",
    },
  };
  res.status(400).send(error);
});

// Only start the server if the file is not imported (i.e., it's run directly)
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

module.exports = app;
