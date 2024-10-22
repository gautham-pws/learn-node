// const request = require("supertest");
// const app = require("../../index");
// describe("GET /api/products", () => {
//   // Test for retrieving all products
//   it("should return all products", async () => {
//     const response = await request(app).get("/api/products");
//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty("data");
//     expect(Array.isArray(response.body.data)).toBe(true);
//   });

//   // Test for retrieving a product by ID
//   it("should return product by id", async () => {
//     const response = await request(app).get("/api/products");
//     const data = response.body.data;

//     const item = data[Math.floor(Math.random() * data.length)];
//     const response2 = await request(app).get(`/api/products/id/${item._id}`);
//     expect(response2.status).toBe(200);
//     // expect(response2.body).toHaveProperty("name");w item._id);

//     const response3 = await request(app).get(
//       `/api/products/id/${item._id}invalidId`
//     );
//     expect(response3.status).toBe(400);
//   });
// });

// describe("POST /api/products", () => {
//   it("create new products", async () => {
//     const newProduct = {
//       name: "test script",
//       description: "created by test file",
//       published: false,
//       price: 24.99,
//       rating: 4.7,
//       userId: "671609182c8cf2ab89c266a9",
//       createdBy: "671609ce2c8cf2ab89c266ae",
//     };
//     const response = await request(app).post("/api/products").send(newProduct);
//     // Expect the response status to be 201 (Created)
//     expect(response.status).toBe(201);

//     // Expect the response body to contain the created product
//     expect(response.body).toHaveProperty("data");
//     const createdProduct = response.body.data;

//     // Validate that the created product matches the data we sent
//     expect(createdProduct.name).toBe(newProduct.name);
//     expect(createdProduct.description).toBe(newProduct.description);
//     expect(createdProduct.published).toBe(newProduct.published);
//     expect(createdProduct.price).toBe(newProduct.price);
//     expect(createdProduct.rating).toBe(newProduct.rating);
//     expect(createdProduct.userId).toBe(newProduct.userId);
//     expect(createdProduct.createdBy).toBe(newProduct.createdBy);
//   });
// });

const request = require("supertest");
const mongoose = require("mongoose");
// const Product = mongoose.model("Product");
const Product = require("../../db/models/product");
const app = require("../../index");

describe("Product API Tests", () => {
  let testProduct;

  beforeAll(async () => {});

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    testProduct = new Product({
      name: "Test Product",
      description: "Test product description",
      published: true,
      price: 49.99,
      rating: 4.8,
      userId: "671609182c8cf2ab89c266a9",
      createdBy: "671609ce2c8cf2ab89c266ae",
    });
    await testProduct.save();
  });

  afterEach(async () => {
    await Product.deleteMany({name: testProduct.name});
  });

  it("should return all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it("should return a product by id", async () => {
    const response2 = await request(app).get(
      `/api/products/id/${testProduct._id}`
    );
    expect(response2.status).toBe(200);
    expect(response2.body._id).toBe(testProduct._id.toString());
    expect(response2.body.name).toBe(testProduct.name);
  });

  it("should return 400 for invalid product id", async () => {
    const response3 = await request(app).get("/api/products/id/invalidId");
    expect(response3.status).toBe(400);
  });

  it("should create a new product", async () => {
    const newProduct = {
      name: "New Product",
      description: "This is a new product",
      published: false,
      price: 19.99,
      rating: 4.5,
      userId: "671609182c8cf2ab89c266a9",
      createdBy: "671609ce2c8cf2ab89c266ae",
    };

    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");
    const createdProduct = response.body.data;

    // Validate that the created product matches the data we sent
    expect(createdProduct.name).toBe(newProduct.name);
    expect(createdProduct.description).toBe(newProduct.description);
    expect(createdProduct.published).toBe(newProduct.published);
    expect(createdProduct.price).toBe(newProduct.price);
    expect(createdProduct.rating).toBe(newProduct.rating);
    expect(createdProduct.userId).toBe(newProduct.userId);
    expect(createdProduct.createdBy).toBe(newProduct.createdBy);
  });
});
