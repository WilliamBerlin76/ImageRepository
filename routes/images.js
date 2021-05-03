const router = require("express").Router();
const multer = require("multer");
const restrictedMiddleware = require("../middleware/restrictedMiddleware");

const assetName = require("../helpers/assetName");

const { 
    addImageToUser,
    getUserImages,
    deleteImages
} = require("../models/images-model");

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, assetName(file.originalname));
    },
    originalname: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: (1024 * 1024)
    }
}).array("imageFile", 3);

// Uploads images for a user by id
router.post("/:user_id/add-images", 
    restrictedMiddleware,
    upload,
    (req, res) => {
        addImageToUser(req.params.user_id, req.files)
            .then(() => {
                res.status(201).json({ message: "successfully added the images" })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    },
);

// Gets images for a user by id
router.get(
    "/:user_id/get-images", 
    restrictedMiddleware,
    (req, res) => {
    getUserImages(req.params.user_id)
        .then((images) => {
            res.status(200).json({ images: images });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

// Removes images TODO
// Making this a POST and not a delete because the request body will be used
router.post(
    "/:user_id/delete-images", 
    restrictedMiddleware,
    (req, res) => {
        deleteImages(req.userObj.id, req.body.imageIds)
        .then(() => {
            res.status(200).json({ message: "successfully deleted the images" });
        })
        .catch(err => {
            res.status(500).json({ message: "the server failed to remove the images", error: err.toString() })
        })
    }
);
module.exports = router;