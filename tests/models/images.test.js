const { intersect } = require("../../config/db-config.js");
const db = require("../../config/db-config.js");

const {
    addImageToUser,
    getUserImages,
    deleteImages
} = require("../../models/images-model");

describe("IMAGES-MODEL", () => {
    beforeEach(async () => {
        await db("images").truncate();
        await db("users").truncate();
        await db("users").insert({
            username: "thisisatest",
            email: "thisisatest@gmail.com",
            password: "thisisatest"
        })
    });

    describe("addImageToUser", () => {
        it("should add an image to the database", async () => {
            const testImage = [{
                originalname: "testimg.png",
                filename: "testFileName.png",
            }];
            await addImageToUser(1, testImage);
            const images = await db("images");
            expect(images).toHaveLength(1);
        })
    })
})