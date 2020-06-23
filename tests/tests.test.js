const app = require("../index");
const supertest = require("supertest");
const request = supertest(app);

describe("Auth routes", () => {
  describe("POST /signup", () => {
    test("POST /signup should fail if missing email || name || password || role", async (done) => {
      const body = {
        name: "Mr. Test",
        password: "1234",
        role: "Hacker",
      };
      const response = await request.post("/signup").send(body);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        "Please supply all sign up information."
      );
      done();
    });
    test("POST /signup should fail if user with email already exists", async (done) => {
      const body = {
        email: "arty@test.com",
        name: "Mr. Test",
        password: "1234",
        role: "Hacker",
      };
      const response = await request.post("/signup").send(body);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        "There is an existing account with this email"
      );
      done();
    });
    test("POST /signup should create a user and homepage", async (done) => {
      const body = {
        email: "test@test.com",
        password: "1234",
        name: "Mr. Test",
        role: "Hacker",
      };
      const response = await request.post("/signup").send(body);
      const response2 = await request.get("/homepages");
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("email");
      expect(response2.status).toBe(200);
      expect(response2.body).toHaveLength(4);
      done();
    });
  });
  describe("POST /login", () => {
    test("POST /should get an error message if missing email || password", async (done) => {
      const body = {
        password: "123456",
      };
      const response = await request.post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        "Please supply a valid email and password"
      );
      done();
    });
    test("POST /should get an error message if user with the email || password doesn't exist", async (done) => {
      const body = {
        email: "sdfsdfsdf@sdfsdf.com",
        password: "123456",
      };
      const response = await request.post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body.message).toEqual(
        "No user with that email/password is incorrect."
      );
      done();
    });
    test("POST /able to log in with valid email and password and get a user object returned", async (done) => {
      const body = {
        email: "coder@test.com",
        password: "123456",
      };
      const response = await request.post("/login").send(body);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "Sam Nerd");
      expect(response.body).toHaveProperty("token");
      done();
    });
  });
});

describe("Homepages routes", () => {
  describe("Get /homepages", () => {
    test("GET /homepages should return an array of homepage objects", async (done) => {
      const response = await request.get("/homepages");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(4);
      expect(response.body[0]).toHaveProperty("user");
      done();
    });
  });
  describe("Get /homepages/:id", () => {
    test("GET /homepages should homepage object", async (done) => {
      const response = await request.get("/homepages/2");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "experience",
        "I've worked for Amazon, Facebook, and Google!"
      );
      expect(response.body).toHaveProperty("websites");
      done();
    });
    test("should respond with 404 if the homepage is not found", async (done) => {
      const response = await request.get("/homepages/99");
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual("Homepage Not Found");
      done();
    });
  });
  describe("Get /homepages/filters", () => {});
});
