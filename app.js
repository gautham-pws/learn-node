import express, {json} from "express";
import "./db.connection.js";
// import "./middleware/scheduler";
// import productRouter from "./routers/product.routers";
// import analyticsRouter from "./routers/analytics.routers";
import userRouter from "./src/routes/user.route.js";
import requestId from "./src/utilities/requestId.js";
import resFormat from "./src/utilities/resFormat.js";

const app = express();

app.use(json());
app.use(requestId);
app.use(userRouter);
// app.use(productRouter);
// app.use(analyticsRouter);

app.use("/*", async (req, res) => {
  const error = resFormat({
    status: "fail",
    code: 400,
    path: req.originalUrl,
    reqId: req.requestId,
    message: "Invalid path",
  });

  res.status(400).send(error);
});

// Only start the server if the file is not imported (i.e., it's run directly)
// if (require.main === module) {
//   app.listen(3000, () => {
//     console.log("Server is running on port 3000");
//   });
// }

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
