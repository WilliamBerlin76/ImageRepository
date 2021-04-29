const router = require("express").Router();

const authRouter = require('../auth/auth-router');
const imageRouter = require("../routes/images");

router.use("/auth", authRouter);
router.use("/images", imageRouter);

module.exports = router;