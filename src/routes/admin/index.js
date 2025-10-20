const express = require("express");
var router = express();

// const authRouter = require("./authRoutes");
const foodRoutes = require("./foodRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/foods", foodRoutes);
// router.use("/auth", authRouter);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes)

module.exports = router;
