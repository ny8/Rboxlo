const moment = require("moment")

var router = require("express").Router()

router.get("/", (req, res) => {
    res.render(
        "home",
        {
            page: {
                title: "Home",
                home: true
            },
            objects: {
                date: moment(Date.now()).format("M/D/YYYY h:mm a")
            }
        }
    )
})

module.exports = router