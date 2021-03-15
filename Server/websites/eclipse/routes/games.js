var router = require("express").Router()

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