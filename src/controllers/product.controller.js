import {Product} from "../models/index.js";
// import auth from "../middleware/auth.js";
import resFormat from "../utilities/resFormat.js";
import logger from "../../logger.js"; // Adjust the import path as needed

// get all the prodcuts by default,
// additionally can pass any query parameteres for filtering, sort by specific order and pagination with page and limit parameter
// example: http://localhost:3000/api/products?userId=6718e0ccae18fa7277624a6c&sortBy=rating:dsc&limit=3&page=2
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
        case "sortBy":
        case "limit":
        case "page":
          break;
        default:
          query[key] = value;
      }
    });

    const sortBy = {};
    const validOrders = ["asc", "dsc"];

    if (req.query.sortBy) {
      const sortFields = req.query.sortBy.split(","); // e.g., "price-asc,rating-desc"
      sortFields.forEach((field) => {
        const [key, order] = field.split(":"); // e.g., "price-asc" => ["price", "asc"]
        if (!validOrders.includes(order)) {
          throw new Error(
            `Invalid sorting order '${order}'. Please use 'asc' for ascending or 'dsc' for descending order`
          );
        }

        sortBy[key] = order === "dsc" ? -1 : 1; // Set sort order
      });
    }

    // Pagination parameters
    const page = Math.max(parseInt(req.query.page) || 1, 1); // Ensure page is at least 1
    const limit = Math.max(parseInt(req.query.limit) || 10, 1); // Ensure limit is at least 1
    const skip = (page - 1) * limit; // Calculate skip value for pagination
    const products = await Product.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);

    // Remove the image field from each product
    const sanitizedProducts = products.map((product) => {
      const productObject = product.toObject();
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

    delete data.message;
    logger.info(`success: ${JSON.stringify(data)}`);
  } catch (e) {
    const error = resFormat({
      status: "fail",
      code: 400,
      path: req.originalUrl,
      reqId: req.requestId,
      message: e.message,
    });
    logger.error(`error: ${e.message}`);

    res.status(400).send(error);
  }
};

// create new user
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
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
