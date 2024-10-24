import resFormat from "../utilities/resFormat.js";

// Middleware to check if the authenticated user is an admin

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = resFormat({
      status: "fail",
      code: 403,
      path: req.originalUrl,
      reqId: req.requestId,
      message: "Access denied. Admins only",
    });
    res.status(403).send(error);
  }
  next();
};

export default isAdmin;
