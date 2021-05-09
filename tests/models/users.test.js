const db = require("../../config/db-config.js");

const {
    get,
    getById,
    add,
    findBy
} = require("../../models/users-model");

describe("USERS-MODEL", () => {
    beforeEach(async () => {
        await db("images").truncate();
        await db("users").truncate();
        await db("users").insert({
            username: "thisisatest",
            email: "thisisatest@gmail.com",
            password: "thisisatest"
        });
    });

    describe("add", () => {
        it("should add a user to the database", async () => {
            let newUser = {
                username: "newTestUser",
                email: "testUser@gmail.com",
                password: "Password1"
            };
            await add(newUser);
            let users = await db("users");
            // length of users should be 2 because a user is added before each test case
            expect(users).toHaveLength(2);
        });
    });

    describe("get", () => {
        it("should retrieve all users", async () => {
            let newUser = {
                username: "newTestUser",
                email: "testUser@gmail.com",
                password: "Password1"
            };
            await add(newUser);
            let users = await get();
            expect(users).toHaveLength(2);
        });
    });

    describe("getById", () => {
        it("should retrieve the user by id", async () => {
            let newUser = {
                username: "newTestUser",
                email: "testUser@gmail.com",
                password: "Password1"
            };
            await add(newUser);
            // get user with id of 2
            let user2 = await getById(2);
            expect(user2.id).toBe(2);
        });

        it("should not retrieve the user's password", async () => {
            let user = await getById(1);
            expect(user.password).toBe(undefined);
        });
    });

    describe("findBy", () => {
        it("should find the users by the specified filter", async () => {4
            let newUser = {
                username: "newTestUser",
                email: "testUser@gmail.com",
                password: "Password1"
            };
            await add(newUser);

            let filter = { username: "thisisatest" };

            let user1 = await findBy(filter);
            expect(user1[0].username).toBe("thisisatest");
        });
    });
});