const request = require("supertest");
const app = require("../app");
const db = require("../db/config/mongodbConnection");

let user;
beforeAll(async () => {
    const insertUser = {
        email: "test@example.com",
        password: "password123",
        username: "testingexample",
        role: 'user'
    }
    user = await db.collection('User').insertOne(insertUser);
});

describe("User Register Test", () => {
    test("should register a user successfully", async () => {
        const user = {
            email: "userbaru@mail.com",
            password: "password123",
            username: "userbaru",
            role: 'user'
        }
        const response = await request(app)
            .post("/register")
            .send(user);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message");

    })
})

afterAll(async () => {
    await db.collection('User').deleteOne({
        _id: user.insertedId
    });
})