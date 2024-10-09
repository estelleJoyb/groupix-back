const request = require("supertest");
const app = require("../server");
const sequelize = require("../config/db");

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should login the user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
