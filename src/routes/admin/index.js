const express = require("express");
var router = express();

// const authRouter = require("./authRoutes");
const foodRoutes = require("./foodRoutes");

router.use("/foods", foodRoutes);
// router.use("/auth", authRouter);

module.exports = router;
