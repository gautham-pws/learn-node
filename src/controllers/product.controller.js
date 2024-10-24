import {Product} from "../models/index.js";
// import auth from "../middleware/auth.js";
import resFormat from "../utilities/resFormat.js";

// get all the users by default,
// additionally can pass email, name or role as query parameter
// example: http://localhost:3000/api/users?name=gautham&email=gautham.p@pacewisdom.com&role=admin
export const getProducts = async (req, res) => {
  try {
    const query = {};

    Object.entries(req.query).forEach(([key, value]) => {
      switch (key) {
        case "name":
        case "description":
          query[key] = {$regex: value, $options: "i"};
          break;
        case "published":
          if (value === "true" || value === "false") {
            query.published = value === "true";
          } else {
            throw new Error(
              `Invalid value for 'published'. Expected 'true' or 'false'`
            );
          }
          break;
        case "price":
        case "rating":
          query[key] = Number(value);
          break;
        default:
          query[key] = value;
      }
    });

    const products = await Product.find(query);

    // Remove the image field from each product
    const sanitizedProducts = products.map((product) => {
      const productObject = product.toObject(); // Convert Mongoose document to plain JavaScript object
      delete productObject.image; // Remove the image field
      return productObject;
    });

    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: sanitizedProducts,
    });
    res.status(200).send(data);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};

// create new user
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    console.log("🚀 ~ createProduct ~ productData:", productData);
    if (req.file) {
      productData.image = req.file.buffer;
    }
    const product = new Product(productData);

    await product.save();

    const data = resFormat({
      status: "pass",
      code: 201,
      path: req.originalUrl,
      reqId: req.requestId,
      message: product,
    });

    res.status(201).send(data);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};

// updated user by id
export const updateProduct = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: user,
    });
    res.status(200).send(data);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};

// delete user by id
export const deleteProduct = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error(`User '${req.params.id}' not found`);
    }
    const data = resFormat({
      status: "pass",
      code: 200,
      path: req.originalUrl,
      reqId: req.requestId,
      message: user,
    });
    res.status(200).send(data);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    res.status(400).send(error);
  }
};
