var router = require("express").Router()

router.get("/create", (req, res) => {
    res.render(
        "account/create",
        {
            page: {
                title: "Register",
                register: true
            }
        }
    )
})

router.get("/login", (req, res) => {
    res.render(
        "account/login",
        {
            page: {
                title: "Login",
                login: true
            }
        }
    )
})

module.exports = router