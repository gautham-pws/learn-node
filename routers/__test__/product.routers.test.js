const request = require("supertest");
const app = require("../../index");

describe("GET /api/products", () => {
  it("should return all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");
    console.log("🚀 ~ it ~ response:", response);
    expect(response.status).toBe(200);
  });
});
