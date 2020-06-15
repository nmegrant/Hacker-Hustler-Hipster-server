const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

describe("Homepage routes", () => {
  describe("GET /homepages", () => {
    test("Should return an array of user objects", async (done) => {
      const response = await request.get("/homepages");
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(1);
      done();
    });
  });
});
