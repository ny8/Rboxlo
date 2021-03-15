const express = require("express")

var router = express.Router()

// Views
router.use("/", require("./main"))
router.use("/games", require("./games"))
router.use("/account", require("./account"))

module.exports = router