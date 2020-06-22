const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

describe("User routes", () => {
  describe("POST /user", () => {
    test("Should create a user and a homepage", async (done) => {
      const body = {
        email: "test@test.com",
        name: "Mr. Test",
        password: "1234",
        role: "Hacker",
      };
      const response = await request.post("/signup").send(body);
      expect(response.status).toBe(201);
      done();
    });
  });
});
