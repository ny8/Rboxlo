const express = require("express")

var router = express.Router()

router.get("/", (req, res) => {
    res.render(
        "games/index",
        {
            page: {
                title: "Games",
                games: true
            }
        }
    )
})

module.exports = router