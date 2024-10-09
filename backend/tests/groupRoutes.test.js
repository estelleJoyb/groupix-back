const request = require("supertest");
const app = require("../server");
const sequelize = require("../config/db");

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});

describe("Group API", () => {
  let token;
  let groupId;

  it("should create a group", async () => {
    const resAuth = await request(app).post("/api/auth/register").send({
      name: "Group User",
      email: "groupuser@example.com",
      password: "password123",
    });

    token = resAuth.body.token;

    const res = await request(app)
      .post("/api/groups")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Group",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", "Test Group");
    groupId = res.body.id;
  });

  it("should get a group by ID", async () => {
    const res = await request(app)
      .get(`/api/groups/${groupId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", groupId);
  });

  it("should delete the group", async () => {
    const res = await request(app)
      .delete(`/api/groups/${groupId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(204);
  });
});
