const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

describe("Auth routes", () => {
  describe("POST /user", () => {
    test("POST /signup should fail if missing email || name || password || role", async (done) => {
      const body = {
        name: "Mr. Test",
        password: "1234",
        role: "Hacker",
      };
      const response = await request.post("/signup").send(body);
      expect(response.status).toBe(400);
      expect(JSON.parse(response.text)).toEqual({
        message: "Please supply all sign up information.",
      });
      done();
    });
  });
  describe("POST /user", () => {
    test("POST /signup should create a user and homepage", async (done) => {
      const body = {
        email: "test@test.com",
        password: "1234",
        name: "Mr. Test",
        role: "Hacker",
      };
      const response = await request.post("/signup").send(body);
      expect(response.status).toBe(201);
      done();
    });
  });
});
