const router = require("express").Router();
const multer = require("multer");

const assetName = require("../helpers/assetName");

const { addImageToUser } = require("../models/images-model");

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


router.post("/:user_id/add-images", 
    upload,
    (req, res) => {
        addImageToUser(req.params.user_id, req.files)
            .then(() => {
                res.status(201).json({ message: "successfully added the images" })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: err });
            })
    },
);

module.exports = router;