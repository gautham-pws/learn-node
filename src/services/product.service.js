import productSchema from "../models/product.schema.js";

productSchema.statics.getProductsWithUserInfo = async function () {
  return await this.aggregate([
    {
      $lookup: {
        from: "users", // the collection name for User
        localField: "userId", // field from Product
        foreignField: "_id", // field from User
        as: "userInfo", // name of the new array field to add
      },
    },
    {
      $unwind: {
        path: "$userInfo",
        preserveNullAndEmptyArrays: true, // Keep products without user associations
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        price: 1,
        rating: 1,
        userId: 1,
        userName: "$userInfo.name", // Get user's name
        userEmail: "$userInfo.email", // Get user's email
      },
    },
  ]);
};
