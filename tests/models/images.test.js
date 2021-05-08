const { intersect } = require("../../config/db-config.js");
const db = require("../../config/db-config.js");
const fsPromises = require("fs").promises;

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
        });
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
        });
    });

    describe("deleteImages", () => {
        it("should remove the user's images", async () => {
            const testImage = [{
                originalname: "testimg.png",
                filename: "testFileName.png",
            }];
            const testImage2 = [{
                originalname: "testimg2.png",
                filename: "testFileName2.png",
            }];
            const data = { 
                fieldname: 'file',
                originalname: '20190221_171825.jpg',
                mimetype: 'image/jpeg',
                size: 5173060 
            };
            // create files so that the deleteImages function works
            await fsPromises.writeFile("uploads/testFileName.png", data, (err) => {
                if (err){
                    console.log(err);
                }
            });
            await fsPromises.writeFile("uploads/testFileName2.png", data, (err) => {
                if (err){
                    console.log(err);
                }
            });
            await addImageToUser(1, testImage);
            await addImageToUser(1, testImage2);
            const images = await db("images");
            expect(images).toHaveLength(2)

            await deleteImages(1, [1,2])
            const deletedImgs = await db("images");
            expect(deletedImgs).toHaveLength(0)

        });
    });
});