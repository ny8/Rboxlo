var router = require("express").Router()

const path = require("path")

const user = require(path.join(global.rboxlo.root, "websites", "eclipse", "lib", "user"))

router.get("/dashboard", user.authenticated, (req, res) => {
    res.render("my/dashboard", { title: "Dashboard" })
})

module.exports = router