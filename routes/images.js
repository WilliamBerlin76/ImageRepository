const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: (1024 * 1024)
    }
}).array("imageFile", 3);

router.post("/:user_id/add-images", upload,
    (req, res) => {
        res.status(201).json({ message: "blank"})
    }
);

module.exports = router;