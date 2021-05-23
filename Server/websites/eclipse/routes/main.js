var router = require("express").Router()

const path = require("path")
const csurf = require("csurf")

const user = require(path.join(global.rboxlo.root, "websites", "eclipse", "lib", "user"))

var csrf = csurf({ cookie: true })

router.get("/", user.loggedOut, csrf, (req, res) => {
    res.render("home", { title: "Home", objects: { csrf: req.csrfToken() } })
})

module.exports = router