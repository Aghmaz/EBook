const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const User = require("../Models/user");
const Book = require("../Models/ebook");
require("dotenv").config({ path: "../config" });

let token;
let userId;
let bookId;

let bookData = {
  title: "Test Book",
  author: "Test Author",
  description: "Blessing",
  genre: "spirtual",
  publishedYear: 2024,
};

beforeAll(async () => {
  // Connect to a test database
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("test db connected to mongodb"))
    .catch((error) => console.log("test db couldn't connected to mongodb"));
});

afterAll(async () => {
  // Clear the database and close the connection
  await User.deleteMany({});
  await mongoose.disconnect();
});

describe("Auth and book Endpoints", () => {
  let userData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "password123",
  };

  test("Should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body.message).toBe("User registered successfully");
  });

  test("Should log in a user and return a token", async () => {
    // First, register the user
    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User 1",
        email: "testuser1@example.com",
        password: "password1234",
      })
      .expect("Content-Type", /json/)
      .expect(201);

    // Then, log in
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser1@example.com",
        password: "password1234",
      })
      .expect("Content-Type", /json/)
      .expect(200);
    token = response.body.token;
    userId = response.body.id;
    expect(response.body).toHaveProperty("token");
  });

  test("Should not register a user with existing email", async () => {
    await request(app)
      .post("/api/auth/signup")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(400);

    const response = await request(app)
      .post("/api/auth/signup")
      .send(userData)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body.error).toBe("User already exists");
  });

  test("Should not log in with incorrect credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: "wrongpassword",
      })
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body.error).toBe("Invalid credentials");
  });

  it("Should create a new book", async () => {
    const response = await request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send(bookData)
      .expect(201);

    bookId = response.body._id;

    expect(response.body).toHaveProperty("_id");
    expect(response.body.title).toBe(bookData.title);
  });

  it("Should get all books", async () => {
    const response = await request(app)
      .get("/api/books/")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Should update a book", async () => {
    const updatedBookData = {
      title: "updated Test Book",
      author: "updated Test Author",
      description: "Blessing",
      genre: "spirtual",
      publishedYear: 2025,
    };

    const response = await request(app)
      .put(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedBookData)
      .expect(200);

    expect(response.body.title).toBe(updatedBookData.title);
    expect(response.body.author).toBe(updatedBookData.author);
  });

  it("Should delete a book", async () => {
    const response = await request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body.message).toBe("Book deleted");
  });
});
