const express = require("express");
var router = express();

const orderRoutes = require("./orderRoutes");
const userRoutes = require("./userRoutes");

router.use("/orders", orderRoutes);
router.use("/users", userRoutes);

module.exports = router;
