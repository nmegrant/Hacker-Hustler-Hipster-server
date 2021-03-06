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
    test("GET /homepages/:id should homepage object for the user with that id", async (done) => {
      const response = await request.get("/homepages/2");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty(
        "experience",
        "Maecenas accumsan neque justo. Morbi mattis sodales lorem sed tincidunt. In hac habitasse platea dictumst. In sodales nisl et dolor consectetur fringilla vitae porta est. In hac habitasse platea dictumst. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed ligula lorem, convallis ac diam id, accumsan ullamcorper libero."
      );
      expect(response.body).toHaveProperty("websites");
      done();
    });
    test("GET /homepages/:id should respond with 404 if the homepage is not found", async (done) => {
      const response = await request.get("/homepages/99");
      expect(response.status).toEqual(404);
      expect(response.body.message).toEqual("Homepage Not Found");
      done();
    });
  });
  describe("Get /homepages/filters", () => {
    test("GET /homepages/filters should return only hipster user if role is set to hipster", async (done) => {
      const response = await request
        .get("/homepages/filters")
        .query({ role: "Hipster" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].user).toHaveProperty("name", "Ashley Artist");
      expect(response.body[0]).toHaveProperty(
        "byline",
        "I'm the creative type"
      );
      done();
    });
    test("GET /homepages/filters should return only user with idea if idea selected", async (done) => {
      const response = await request
        .get("/homepages/filters")
        .query({ idea: true });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].user).toHaveProperty("name", "Chad Moneybags");
      expect(response.body[0]).toHaveProperty(
        "byline",
        "Looking for brilliant people to work on my genius idea"
      );
      done();
    });
    test("GET /homepages/filters should return only users with the skills selected", async (done) => {
      const response = await request
        .get("/homepages/filters")
        .query({ skills: ["Javascript", "C++"] });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].user).toHaveProperty("name", "Sam Nerd");
      expect(response.body[0]).toHaveProperty(
        "byline",
        "I'm a coding rockstar"
      );
      done();
    });
    test("GET /homepages/filters should return only users with the skills part 2", async (done) => {
      const response = await request
        .get("/homepages/filters")
        .query({ skills: ["Market Research", "Project Management"] });
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].user).toHaveProperty("name", "Chad Moneybags");
      expect(response.body[0]).toHaveProperty(
        "byline",
        "Looking for brilliant people to work on my genius idea"
      );
      done();
    });
  });
});

describe("Ideas routes", () => {
  describe("Get /ideas", () => {
    test("GET /ideas should return an array of idea objects", async (done) => {
      const body = {
        email: "hustler@test.com",
        password: "test1234",
      };
      const response = await request.post("/login").send(body);
      const response2 = await request
        .get("/ideas")
        .set("Authorization", `Bearer ${response.body.token}`);
      expect(response.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(response2.body).toHaveLength(1);
      expect(response2.body[0]).toHaveProperty("title");
      done();
    });
  });
  describe("Post /ideas", () => {
    test("POST /ideas should add an idea and return the new idea", async (done) => {
      const body = {
        email: "hustler@test.com",
        password: "test1234",
      };
      const response = await request.post("/login").send(body);
      const body2 = {
        title: "New Idea",
        description: "Describe new idea",
        hacker: true,
        hipster: false,
        hustler: false,
        userId: 1,
      };
      const response2 = await request
        .post("/ideas")
        .send(body2)
        .set("Authorization", `Bearer ${response.body.token}`);
      const response3 = await request
        .get("/ideas")
        .set("Authorization", `Bearer ${response.body.token}`);
      expect(response2.status).toBe(201);
      expect(response2.body).toHaveProperty("title", "New Idea");
      expect(response3.body).toHaveLength(2);
      done();
    });
  });
  describe("Delete /ideas", () => {
    test("DELETE /ideas should delete the selected idea", async (done) => {
      const body = {
        email: "hustler@test.com",
        password: "test1234",
      };
      const response = await request.post("/login").send(body);
      const response2 = await request
        .delete("/ideas")
        .send({ id: "2" })
        .set("Authorization", `Bearer ${response.body.token}`);
      const response3 = await request
        .get("/ideas")
        .set("Authorization", `Bearer ${response.body.token}`);
      expect(response2.status).toBe(204);
      expect(response3.body).toHaveLength(1);
      done();
    });
  });
});

describe("MyPage routes", () => {
  describe("Get /mypages", () => {
    test("GET /mypages should an object with homepage info", async (done) => {
      const body = {
        email: "arty@test.com",
        password: "password",
      };
      const response = await request.post("/login").send(body);
      const response2 = await request
        .get("/mypage")
        .set("Authorization", `Bearer ${response.body.token}`);
      expect(response2.status).toBe(200);
      expect(response2.body).toHaveProperty(
        "bio",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean maximus faucibus turpis quis fermentum. Etiam malesuada elit vitae est scelerisque facilisis. Donec vel euismod leo, id faucibus ex. Nullam tempus luctus neque, eget fermentum velit. Donec aliquam vestibulum pharetra. Praesent sem eros, viverra non justo at, iaculis sagittis odio. Aenean lorem mauris, sagittis et faucibus in, cursus eget justo. Vestibulum eleifend nunc suscipit fringilla eleifend. Aenean vitae eros faucibus, eleifend quam eget, ornare tellus. Nullam in dignissim ipsum. Ut auctor consectetur libero. Sed ut efficitur quam. Cras venenatis, est aliquam tristique elementum, turpis sem blandit tellus, id tristique velit nibh in magna. Nunc id ipsum dui. Cras at tellus venenatis, hendrerit urna nec, vehicula sem. Cras iaculis euismod pulvinar."
      );
      expect(response2.body).toHaveProperty("user");
      expect(response2.body).toHaveProperty("websites");
      done();
    });
  });
  describe("Patch /mypages", () => {
    test("PATCH /mypages should update homepage info for that user", async (done) => {
      const body = {
        email: "test@test.com",
        password: "1234",
      };
      const response = await request.post("/login").send(body);
      const response2 = await request
        .patch("/mypage")
        .send({
          bio: "New bio",
          experience: "New experience",
          byline: "New byline",
          location: "New loaction",
          idea: true,
        })
        .set("Authorization", `Bearer ${response.body.token}`);
      const response3 = await request
        .get("/homepages/filters")
        .query({ idea: true });

      expect(response2.status).toBe(200);
      expect(response2.body).toHaveProperty("bio", "New bio");
      expect(response2.body).toHaveProperty("experience", "New experience");
      expect(response2.body).toHaveProperty("userId", 5);
      expect(response3.body).toHaveLength(2);
      done();
    });
  });
});

describe("Skills routes", () => {
  describe("Get /skills", () => {
    test("GET /skills should return a long array of all skill objects", async (done) => {
      const response = await request.get("/skills");
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(33);
      expect(response.body[0]).toHaveProperty("skill");
      done();
    });
  });
  describe("Get /skills/user", () => {
    test("GET /skills/user should add skills for the user and return an array with the new skills objects", async (done) => {
      const body = {
        email: "arty@test.com",
        password: "password",
      };
      const response = await request.post("/login").send(body);
      const response2 = await request
        .post("/skills/user")
        .send({ skills: ["Python", "PHP"] })
        .set("Authorization", `Bearer ${response.body.token}`);
      const response3 = await request
        .get("/mypage")
        .set("Authorization", `Bearer ${response.body.token}`);
      expect(response2.body).toHaveLength(2);
      expect(response2.status).toBe(201);
      expect(response3.body.user).toHaveProperty("tags");
      expect(response3.body.user.tags).toHaveLength(4);
      done();
    });
  });
});

describe("Website routes", () => {
  describe("Post /websites", () => {
    test("POST /websites should add websites for the user and return an array with the new skills objects", async (done) => {
      const body = {
        email: "arty@test.com",
        password: "password",
      };
      const response = await request.post("/login").send(body);
      const response2 = await request
        .post("/websites")
        .send({ urls: ["www.linkedin.com", "www.github.com"] })
        .set("Authorization", `Bearer ${response.body.token}`);

      const response3 = await request
        .get("/mypage")
        .set("Authorization", `Bearer ${response.body.token}`);

      expect(response2.status).toBe(201);
      expect(response2.body).toHaveLength(2);
      expect(response2.body[0].url).toEqual("www.linkedin.com");
      expect(response3.body).toHaveProperty("websites");
      expect(response3.body.websites).toHaveLength(2);
      expect(response3.body.websites[0]).toHaveProperty("url");
      done();
    });
  });
});

describe("auth middleware", () => {
  describe("auth middleware", () => {
    test("Should return invalid JWT token when random token sent", async (done) => {
      const response = await request
        .get("/mypage")
        .set("Authorization", `Bearer ${"111"}`);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid JWT token");
      done();
    });
    test("Should return request for valid credentials if no token sent", async (done) => {
      const response = await request
        .get("/mypage")
        .set("Authorization", `Bearers `);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Please supply valid credentials");
      done();
    });
    test("Should return request for valid credentials if no Bearers sent", async (done) => {
      const body = {
        email: "arty@test.com",
        password: "password",
      };
      const response = await request.post("/login").send(body);
      const response2 = await request
        .get("/mypage")
        .set("Authorization", `${response.body.token}`);
      expect(response2.status).toBe(401);
      expect(response2.body.message).toBe("Please supply valid credentials");
      done();
    });
  });
});
